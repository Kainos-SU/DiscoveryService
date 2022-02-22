import { calculateXorCrc, checkXorCrc } from "../ECDM/helpers";
import { STANDARD_BYTES, COMMAND_CODES, MINIMECHStatus, STATUS_CODES, STATUS_BIT_SHIFT } from "./constants";
import { IDispenseAnswer } from "../../model/IDispenser";

export const isValidResponse = (response: Array<number>): boolean => {
  const indexOfStartOfText = response.indexOf(STANDARD_BYTES.START_OF_TEXT);
  if (indexOfStartOfText !== 2) {
    return false;
  }

  const indexOfCRC: number = response.indexOf(STANDARD_BYTES.END_OF_TEXT) + 1;

  if (indexOfCRC < 6) {
    return false;
  }

  return checkXorCrc(response.slice(indexOfStartOfText, indexOfCRC + 1));
}

export const formatMessage = (command: COMMAND_CODES, data: Array<number> = []): Array<number> => {
  const message: Array<number> = [STANDARD_BYTES.START_OF_TRANSMISSION, STANDARD_BYTES.COMM_IDENTITY, STANDARD_BYTES.START_OF_TEXT];
  message.push(command);
  for (const byte of data) {
    message.push(byte);
  }
  message.push(STANDARD_BYTES.END_OF_TEXT);
  const crc = calculateXorCrc(message);
  message.push(crc);
  return message;
}

export const parseDispense = (data: Array<number>): IDispenseAnswer => {
  const indexOfStart: number = data.indexOf(STANDARD_BYTES.START_OF_HEADER);
  const indexOfCRC: number = data.indexOf(STANDARD_BYTES.END_OF_TEXT) + 1;
  const response = data.slice(indexOfStart, indexOfCRC + 1);
  const ok: boolean = !(response[4] - 0x20);
  const crc: boolean = checkXorCrc(response);
  const errorCode: number = response[4];
  const errorText: string = STATUS_CODES.get(response[4]) || "";
  const cassettes = [{
    cassetteNumber: 1,
    requestedBillCHK: response[5] - 0x20,
    requestedBillEXIT: response[5] - 0x20,
    rejectedBill: response[6] - 0x20,
    cassetteStatus: "OK!"
  }];

  return {
    ok,
    crc,
    errorCode,
    errorText,
    cassettes
  };
}

export const parseStatus = (data: Array<number>): MINIMECHStatus => {
  const indexOfStart: number = data.indexOf(STANDARD_BYTES.START_OF_HEADER);
  const indexOfCRC: number = data.indexOf(STANDARD_BYTES.END_OF_TEXT) + 1;
  const trimmedData = data.slice(indexOfStart, indexOfCRC + 1);
  const data0 = trimmedData[4];
  const data1 = trimmedData[5];
  const AVERAGE_THICKNESS: number = trimmedData[6] - 0x20;
  const AVERAGE_LENGTH: number = trimmedData[7] - 0x20;

  const FEED_SENSOR_BLOCKED: boolean = Boolean(STATUS_BIT_SHIFT.FEED_SENSOR_BLOCKED && data0);
  const EXIT_SENSOR_BLOCKED: boolean = Boolean(STATUS_BIT_SHIFT.EXIT_SENSOR_BLOCKED && data0);
  const RESET_SINCE_LAST_STATUS_MESSAGE: boolean = Boolean(STATUS_BIT_SHIFT.RESET_SINCE_LAST_STATUS_MESSAGE && data0);
  const TIMING_WHEEL_SENSOR_BLOCKED: boolean = Boolean(STATUS_BIT_SHIFT.TIMING_WHEEL_SENSOR_BLOCKED && data0);
  const CALIBRATING_DOUBLE_DETECT: boolean = Boolean(STATUS_BIT_SHIFT.CALIBRATING_DOUBLE_DETECT && data1);

  return {
    FEED_SENSOR_BLOCKED,
    EXIT_SENSOR_BLOCKED,
    RESET_SINCE_LAST_STATUS_MESSAGE,
    TIMING_WHEEL_SENSOR_BLOCKED,
    CALIBRATING_DOUBLE_DETECT,
    AVERAGE_THICKNESS,
    AVERAGE_LENGTH
  };

}