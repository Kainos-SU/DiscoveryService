import { COEFFICIENT_OF_VALUES, COMMAND_CODES, DISP0_BIT_MASK, DISP1_BIT_MASK, STAT_BIT_MASK, STANDART_BYTES, ERROR_CODES, TYPE_CONSTANT } from "./constants";
import { BITS_DISP0, IDISP0Status, IDISP1Status, IECDMCassetteStatus, IECDMSTATStatus, IECDMStatus, SensorStatus } from "./types";
import { IDispenseAnswer } from "../../model/IDispenser";

export function calculateXorCrc(message: Array<number>): number {
  let crc = 0;
  for (const num of message) {
    if (num > 255 || num < 0) {
      throw new Error(`[XOR CRC] Error. Inputting array includes number less then 0 or greater than 255! ${num}`);
    }
    crc ^= num;
  }
  return crc;
}

export function checkXorCrc(message: Array<number>): boolean {
  const temp = [...message];
  const crc = temp.pop();
  const calculatedCrc = calculateXorCrc(temp);
  return crc === calculatedCrc;
}

export function parseStatus(data: Array<number>): IECDMStatus {
  let primaryResponse = filterResponse(data);
  let messageToParse: Array<number> = [];
  const indexCMD = primaryResponse.indexOf(COMMAND_CODES.STATUS);
  const indexOfEXT = primaryResponse.indexOf(STANDART_BYTES.EXT, indexCMD);
  messageToParse = primaryResponse.slice(indexCMD + 1, indexOfEXT);

  const errorCode = decodeValue(messageToParse.shift() || 0x20);
  const error = errorCode <= 0 ? ERROR_CODES.get(errorCode) || "Unknown" : "No Error";
  const DISP0 = parseDISP0(messageToParse.shift() || 0x20);
  const DISP1 = parseDISP1(messageToParse.shift() || 0x20);

  const cassettes: Array<IECDMCassetteStatus> = [];
  for (let i = 0; i < messageToParse.length; i += 4) {
    const status = parseSTAT(messageToParse[i]);
    const inserted = Boolean(messageToParse[i + 1] - TYPE_CONSTANT);
    const billThickness = decodeValue(messageToParse[i + 2]);
    const billLength = decodeValue(messageToParse[i + 3]);
    const cassetteNumber = i / 4 + 1;
    cassettes.push({
      status,
      inserted,
      billThickness,
      billLength,
      cassetteNumber
    });
  }

  return {
    error,
    errorCode,
    DISP0,
    DISP1,
    cassettes,
    rawResponse: primaryResponse
  };
}

export function filterResponse(data: Array<number>): Array<number> {
  const indexOfSOH = data.indexOf(STANDART_BYTES.SOH);
  const indexOfEXT = data.indexOf(STANDART_BYTES.EXT, indexOfSOH);
  const response = data.slice(indexOfSOH, indexOfEXT + 2);
  if (!checkXorCrc(response)) {
    throw new Error("[ECDM] Error of checking CRC!");
  }
  const result = data.includes(STANDART_BYTES.ACK) ? [STANDART_BYTES.ACK] : [];
  result.push(...response);
  return result;
}

export function prepareDataForDispense(dispenseData: Array<{ cassette: number; count: number }>): Array<number> {
  if (
    dispenseData.length > 4 ||
    dispenseData.some((el) => {
      if (el.cassette > 4 || el.cassette < 1) {
        return true;
      }
      return el.count > 100;
    })
  ) {
    throw new Error("[ECDM helper] Invalid value to dispense!");
  }
  const result: Array<number> = new Array<number>(4).fill(0x20);
  dispenseData.forEach((el) => {
    result[el.cassette - 1] = el.count + COEFFICIENT_OF_VALUES;
  });
  const reserved = new Array(9).fill(0x20);
  result.push(
    // Enable Timeout (0x20 - disable, 0x1C - enable)
    0x20,
    // If timeout disabled - 0x20, else - from 0x30 to 0x39
    0x20,
    // Reserved bytes
    ...reserved
  );
  return result;
}

/**
 *
 * Функция для парсинга ответа от диспенсера.
 *
 * @param data Массив чисел(байтов) начиная (и включая) c SOH и заканчивая (также включая) BCC
 * @return IDispenseAnswer {
 *  crc: boolean;
 *  errorCode: number;
 *  errorText: string;
 *  cassettes: Array<{
 *    cassetteNumber: number;
 *    requestedBillCHK: number;   В этой модели диспенсера всегда равен значению EXIT
 *    requestedBillEXIT: number;
 *    rejectedBill: number;
 *    cassetteStatus: string;
 *  }>;
}
 */

export function parseDispenseData(data: Array<number>): IDispenseAnswer {
  const crc = checkXorCrc(data);
  const errorCode = decodeValue(data[4]);
  const errorText = ERROR_CODES.get(errorCode) || "";
  const cassettes: Array<{
    cassetteNumber: number;
    requestedBillCHK: number;
    requestedBillEXIT: number;
    rejectedBill: number;
    cassetteStatus: string;
  }> = [];
  const indexOfCmd = data.indexOf(COMMAND_CODES.DISPENSE);
  const dataToParse = data.slice(indexOfCmd + 3, indexOfCmd + 15);
  for (let i = 0; i < dataToParse.length; i += 3) {
    const requestedBillEXIT = decodeValue(dataToParse[i]);
    const rejectedBill = decodeValue(dataToParse[i + 1]);
    const cassetteNumber = i / 3 + 1;
    cassettes.push({
      requestedBillEXIT,
      requestedBillCHK: requestedBillEXIT,
      rejectedBill,
      cassetteNumber,
      cassetteStatus: "gud"
    });
  }

  return {
    ok: !errorCode,
    crc,
    errorCode,
    errorText,
    cassettes
  };
}

function parseDISP0(byte: number): IDISP0Status {
  let stat = {} as IDISP0Status;
  for (const [key, obj] of Object.entries(DISP0_BIT_MASK)) {
    const indexKey = key as keyof IDISP0Status;
    stat[indexKey] = {
      description: obj.state,
      state: Boolean(obj.bit & byte)
    };
  }
  return stat as IDISP0Status;
}

function parseDISP1(byte: number): IDISP1Status {
  let status = {} as IDISP1Status;
  for (const [key, obj] of Object.entries(DISP1_BIT_MASK)) {
    const indexKey = key as keyof IDISP1Status;
    status[indexKey] = {
      description: obj.state,
      state: Boolean(obj.bit & byte)
    };
  }
  return status;
}

function parseSTAT(byte: number): IECDMSTATStatus {
  let status = {} as IECDMSTATStatus;
  for (const [key, obj] of Object.entries(STAT_BIT_MASK)) {
    const indexKey = key as keyof IECDMSTATStatus;
    status[indexKey] = {
      description: obj.state,
      state: Boolean(obj.bit & byte)
    };
  }
  return status;
}

export function decodeValue(byte: number): number {
  if (byte > 255 || byte < COEFFICIENT_OF_VALUES) {
    throw new Error("[Decode Value] Incorrect input value");
  }
  return byte - COEFFICIENT_OF_VALUES;
}

export function encodeValue(byte: number): number {
  if (byte > 255 - COEFFICIENT_OF_VALUES || byte < 0) {
    throw new Error("[Encode Value] Incorrect input value");
  }
  return byte + COEFFICIENT_OF_VALUES;
}
