import {
  CODES_OF_ERRORS,
  COMMAND_CODES,
  ERROR_CODES,
  SENSOR_STATUS,
  STANDART_BYTES,
  STATUS_OF_CASSETTE
} from "./constants";
import { ILCDMPortAnswer, ILCDMStatus } from "./types";
import { IDispenseAnswer } from "../../model/IDispenser";

import { Logger } from "../../../helpers/logger";

const log = new Logger("[LCDM-helper]");

export function calculateCRC(message: Array<number>): number {
  let crc = 0;
  for (const i of message) {
    if (i < 0 || i > 255) {
      throw new RangeError("Values of message need to be between 0 and 255, get " + i);
    }
    crc ^= i;
  }
  return crc;
}

export function checkCRC(message: Array<number>): boolean {
  const temp = [...message];
  const crc = temp.pop();
  const calculatedCRC = calculateCRC(temp);
  return crc === calculatedCRC;
}

export function handleLDCMAnswer(response: Array<number>): ILCDMPortAnswer {
  if (!response || response.length === 0) {
    log.debug("Invalid LCDM response", response);
    return {
      ack: false,
      error: true,
      crc: false,
      data: []
    };
  }

  if (response[0] === 0x04) {
    log.debug("Error forvardin 0x04");
  }

  response = response.filter((it) => it !== 0xff);
  const soh = response.indexOf(STANDART_BYTES.SOH);
  const ext = response.indexOf(STANDART_BYTES.EXT, soh);

  const data = soh === -1 || ext === -1 ? [] : response.slice(soh, ext + 2);
  const responseAck = response.indexOf(STANDART_BYTES.ACK);

  if (data.length < 4) {
    if (responseAck !== -1) {
      return {
        ack: true,
        crc: false,
        error: false,
        data: data
      };
    }
    log.debugError("Error on handle answer. Data is:", response);
    return {
      ack: false,
      error: true,
      crc: false,
      data: []
    };
  }

  const crc = calculateCRC(data.slice(0, -1));
  const error = data[3] === COMMAND_CODES.UPPER_DISPENSE ? data[8] : data[4];
  const payload = {
    ack: response[0] === STANDART_BYTES.ACK,
    crc: crc === data[data.length - 1],
    error: false,
    errorCode: error,
    data: data
  };
  return payload;
}

export function parseStatus(response: Array<number>, type: string): ILCDMStatus {
  const errorCode = response[5];
  const [sensor0StatusHumanReadable, sensor0Status] = checkSensor0(response[6]);
  const [sensor1StatusHumanReadable, sensor1Status] = checkSensor1(response[7], type);
  const errorStatus = ERROR_CODES.get(errorCode) || "";
  const ok = errorStatus === "Good" || errorStatus === "Normal Stop";
  return {
    ok,
    errorStatus,
    errorCode,
    sensor0Status,
    sensor1Status,
    sensor0StatusHumanReadable,
    sensor1StatusHumanReadable
  };
}

export function checkSensor0(code: number): [string, { [s: string]: boolean }] {
  let result: { [s: string]: boolean } = {};
  let resultHumanReadable = "Sensor 0 Status:\n";
  for (const [key, value] of Object.entries(SENSOR_STATUS.SENSOR_0)) {
    result[key] = Boolean(value & code);
    resultHumanReadable += `${key.replaceAll("_", " ")}: ${result[key] ? "OFF" : "ON"}\n`;
  }
  return [resultHumanReadable, result];
}

export function checkSensor1(code: number, type: string): [string, { [s: string]: boolean }] {
  let result: { [s: string]: boolean } = {};
  let resultHumanReadable = "Sensor 1 Status:\n";
  let base: { [s: string]: number } = {};
  if (type === "LCDM-1000") {
    base = SENSOR_STATUS.SENSOR_1_LCDM_1000;
  } else {
    base = SENSOR_STATUS.SENSOR_1_LCDM_2000;
  }

  for (const [key, value] of Object.entries(base)) {
    result[key] = Boolean(value & code);
    if (key === "REJECT_TRAY_S_W") {
      resultHumanReadable += `Reject tray S/W: ${result[key] ? "No Reject tray" : "Reject tray is on"}\n`;
      continue;
    }
    resultHumanReadable += `${key.replaceAll("_", " ")}: ${result[key] ? "OFF" : "ON"}\n`;
  }
  return [resultHumanReadable, result];
}

export function parseDispense(response: Array<number>): IDispenseAnswer {
  const startIndex = response.indexOf(STANDART_BYTES.STX);
  const backIndex = response.indexOf(STANDART_BYTES.EXT);
  const cmd = response[startIndex + 1];
  let numberOfDispenses: number = 0;

  if (cmd === COMMAND_CODES.LOWER_DISPENSE || cmd === COMMAND_CODES.UPPER_DISPENSE) {
    numberOfDispenses = 1;
  } else if (cmd === COMMAND_CODES.UPPER_AND_LOWER_DISPENSE) {
    numberOfDispenses = 2;
  }

  const startOfData = response.indexOf(cmd) + 1;
  const endOfData = startOfData + numberOfDispenses * 4;
  const dispenseData = response.slice(startOfData, endOfData);
  const startOfRejectData = endOfData + numberOfDispenses + 1;
  const rejectData = response.slice(startOfRejectData, backIndex);

  const errorCode = response[endOfData];
  const errorText = ERROR_CODES.get(errorCode) || "";

  const result: IDispenseAnswer = {
    ok: (CODES_OF_ERRORS["Good"] === errorCode) || (CODES_OF_ERRORS["Normal Stop"] === errorCode),
    errorCode,
    errorText,
    crc: checkCRC(response),
    cassettes: []
  };

  for (let i = 1; i <= numberOfDispenses; i++) {
    const requestedBillCHK: number = parseInt(
      dispenseData
        .splice(0, 2)
        .map((num) => String.fromCharCode(num))
        .join("")
    );
    const requestedBillEXIT: number = parseInt(
      dispenseData
        .splice(0, 2)
        .map((num) => String.fromCharCode(num))
        .join("")
    );
    const rejectedBill: number = parseInt(
      rejectData
        .splice(0, 2)
        .map((num) => String.fromCharCode(num))
        .join("")
    );
    const cassetteStatus: string = STATUS_OF_CASSETTE[endOfData + i];
    result.cassettes.push({
      cassetteNumber: numberOfDispenses > 1 ? i : getCassetteNumber(cmd),
      requestedBillCHK,
      requestedBillEXIT,
      rejectedBill,
      cassetteStatus
    });
  }

  return result;
}

function getCassetteNumber(cmd: number) {
  if (COMMAND_CODES.UPPER_DISPENSE === cmd) {
    return 1;
  }
  if (COMMAND_CODES.LOWER_DISPENSE === cmd) {
    return 2;
  }
  return -1;
}
