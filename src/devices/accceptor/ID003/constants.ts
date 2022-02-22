import { Logger } from "../../../helpers/logger";

const log = new Logger("[ID003-helpers]");

export const CODES_OF_TRANSMITTER = Object.freeze({
  STATUS_REQUEST: 0x11,
  ACK: 0x50,
  OPERATION_COMMAND: {
    RESET: 0x40,
    STACK_1: 0x41,
    STACK_2: 0x42,
    RETURN: 0x43,
    HOLD: 0x44,
    WAIT: 0x45
  },
  SETTING_COMMAND: {
    ENABLE_DISABLE: 0xc0,
    SECURITY: 0xc1,
    COMMUNICATION_MODE: 0xc2,
    INHIBIT_ACCEPTOR: 0xc3,
    DIRECTION: 0xc4,
    OPTIONAL_FUNCTION: 0xc5
  },
  SETTING_STATUS_REQUEST: {
    ENABLE_DISABLE: 0x80,
    SECURITY: 0x81,
    COMMUNICATION_MODE: 0x82,
    INHIBIT_ACCEPTOR: 0x83,
    DIRECTION: 0x84,
    OPTIONAL_FUNCTION: 0x85,
    VERSION_REQUEST: 0x88,
    BOOT_VERSION_REQUEST: 0x89,
    CURRENCY_ASSIGN_REQUEST: 0x8a
  }
});

export const RESIVER_RESPONSES = Object.freeze({
  STATUS: {
    ENABLE_IDLING: 0x11,
    ACCEPTING: 0x12,
    ESCROW: 0x13,
    STACKING: 0x14,
    VEND_VALID: 0x15,
    STACKED: 0x16,
    REJECTING: 0x17,
    RETURNING: 0x18,
    HOLDING: 0x19,
    DISABLED_INHIBIT: 0x1a,
    INITIALIZE: 0x1b
  },
  POWER_UP_STATUS: {
    POWER_UP: 0x40,
    POWER_UP_WITH_BILL_IN_ACCEPTOR: 0x41,
    POWER_UP_WITH_BILL_IN_STACKER: 0x42
  },
  ERROR_STATUS: {
    STACKER_FULL: 0x43,
    STACKER_OPEN: 0x44,
    JAM_IN_ACCEPTOR: 0x45,
    JAM_IN_STACKER: 0x46,
    PAUSE: 0x47,
    CHEATED: 0x48,
    FAILURE: 0x49,
    COMMUNICATION_ERROR: 0x4a
  },
  POLL_REQUEST: 0x05,
  RESPONSE_TO_OPERATION_COMMAND: {
    ACK: 0x50,
    INVALID_COMMAND: 0x48
  },
  RESPONSE_TO_SETTING_COMMAND: {
    ENABLE_DISABLE: 0x80,
    SECURITY: 0x81,
    COMMUNICATION_MODE: 0x82,
    INHIBIT_ACCEPTOR: 0x83,
    DIRECTION: 0x84,
    OPTIONAL_FUNCTION: 0x85,
    VERSION_INFORMATION: 0x88,
    BOOT_VERSION_INFORMATION: 0x89,
    DENOMINATION_DATA: 0x8a
  }
});

export const ENQ = 0x05;

export const CODES_OF_RESSIVER = Object.freeze({
  STATUS: new Map<number, string>([
    [0x11, "ENABLE IDLING"],
    [0x12, "ACCEPTING"],
    [0x13, "ESCROW"],
    [0x14, "STACKING"],
    [0x15, "VEND VALID"],
    [0x16, "STACKED"],
    [0x17, "REJECTING"],
    [0x18, "RETURNING"],
    [0x19, "HOLDING"],
    [0x1a, "DISABLED INHIBIT"],
    [0x1b, "INITIALIZE"]
  ]),

  POWER_UP_STATUS: new Map<number, string>([
    [0x40, "POWER UP"],
    [0x41, "POWER UP WITH BILL IN ACCEPTOR"],
    [0x42, "POWER UP WITH BILL IN STACKER"]
  ]),

  ERROR_STATUS: new Map<number, string>([
    [0x43, "STACKER FULL"],
    [0x44, "STACKER OPEN"],
    [0x45, "JAM IN ACCEPTOR"],
    [0x46, "JAM IN STACKER"],
    [0x47, "PAUSE"],
    [0x48, "CHEATED"],
    [0x49, "FAILURE"],
    [0x4a, "COMMUNICATION ERROR"]
  ]),

  RESPONSE_TO_OPERATION_COMMAND: new Map<number, string>([
    [0x50, "ACK"],
    [0x48, "INVALID COMMAND"]
  ]),

  RESPONSE_TO_SETTING_COMMAND: new Map<number, string>([
    [0x80, "ENABLE DISABLE"],
    [0x81, "SECURITY"],
    [0x82, "COMMUNICATION_MODE"],
    [0x83, "INHIBIT ACCEPTOR"],
    [0x84, "DIRECTION"],
    [0x85, "OPTIONAL FUNCTION"],
    [0x88, "VERSION INFORMATION"],
    [0x89, "BOOT VERSION INFORMATION"],
    [0x8a, "DENOMINATION DATA"]
  ])
});

export const FAILURE_CODES = new Map<number, string>([
  [0xa2, "Stack motor failure"],
  [0xa5, "Transport (feed) motor speed failure"],
  [0xa6, "Transport (feed) motor failure"],
  [0xa8, "Solenoid Failure"],
  [0xa9, "PB Unit failure"],
  [0xab, "Cash box not ready"],
  [0xaf, "Validator head remove"],
  [0xb0, "BOOT ROM failure"],
  [0xb1, "External ROM failure"],
  [0xb2, "RAM failure"],
  [0xb3, "External ROM writing failure"]
]);

export const REJECT_REASONS = new Map<number, string>([
  [0x71, "Insertion error"],
  [0x72, "Mug error"],
  [0x73, "Return action due to residual bills, etc. (at the head part of ACCEPTOR)"],
  [0x74, "Calibration error/ Magnification error"],
  [0x75, "Conveying error"],
  [0x76, "Discrimination error for bill denomination"],
  [0x77, "Photo pattern error"],
  [0x78, "Photo level error"],
  [0x79, "Return by INHIBIT: Error of insertion direction/ Error of bill denomination. No command sent answering to ESCROW"],
  [0x7a, "Reserved"],
  [0x7b, "Operation error"],
  [0x7c, "Return action due to residual bills, etc. (at the stacker)"],
  [0x7d, "Length error"],
  [0x7e, "Photo pattern error"], // Duplicate?
  [0x7f, "True bill feature error"]
]);

export const START_WORD = 0xfc;

export const COUNTRY_TYPE_TABLE = new Map<number, string>([[0x5c, "UAH"]]);

export type CurrencyRecord = {
  denominator: number;
  value: number;
  currency: number;
};

export function isValidResponse(message: Array<number>): boolean {
  if (!message) {
    // log.debugError("Empty message", message);
    return false;
  }
  if (message[0] !== START_WORD) {
    // log.debugError("Invalid start word", message);
    return false;
  }
  if (message[1] !== message.length) {
    // log.debugError("Invalid length fact: " + message.length + "in message: " + message[1]);
    return false;
  }
  let flag: boolean = false;
  for (const map of [
    CODES_OF_RESSIVER.STATUS,
    CODES_OF_RESSIVER.POWER_UP_STATUS,
    CODES_OF_RESSIVER.ERROR_STATUS,
    CODES_OF_RESSIVER.RESPONSE_TO_OPERATION_COMMAND,
    CODES_OF_RESSIVER.RESPONSE_TO_SETTING_COMMAND
  ]) {
    if (map.has(message[2])) {
      flag = true;
    }
  }
  if (message[2] !== ENQ) {
    flag = true;
  }
  if (!flag) {
    // log.debugError("Invalid response command!");
    return false;
  }
  const calculatedCRC: Array<number> = crc(message.slice(0, message.length - 2));
  const upperByte: number = message[message.length - 2];
  const lowerByte: number = message[message.length - 1];
  if (calculatedCRC[0] !== upperByte) {
    return false;
  }
  if (calculatedCRC[1] !== lowerByte) {
    return false;
  }
  return true;
}

export function isValidCommandCode(code: number): boolean {
  const codes: Array<number> = [CODES_OF_TRANSMITTER.STATUS_REQUEST, CODES_OF_TRANSMITTER.ACK];
  codes.push(...Object.values(CODES_OF_TRANSMITTER.OPERATION_COMMAND));
  codes.push(...Object.values(CODES_OF_TRANSMITTER.SETTING_COMMAND));
  codes.push(...Object.values(CODES_OF_TRANSMITTER.SETTING_STATUS_REQUEST));
  return codes.includes(code);
}

export function parseCurrencyTable(raw: Array<number>): Array<{ denominator: number; value: number; currency: number }> {
  if (RESIVER_RESPONSES.RESPONSE_TO_SETTING_COMMAND.DENOMINATION_DATA !== raw[2]) {
    throw new Error("Invalid data for currency table!");
  }
  const result: Array<{ denominator: number; value: number; currency: number }> = [];
  const denominationData: Array<number> = raw.slice(3, raw.length - 2);
  for (let i = 0; i < denominationData.length; i += 4) {
    const intPart = denominationData[i + 2];
    const exponentPart = Math.pow(10, denominationData[i + 3]);
    result.push({
      denominator: denominationData[i],
      value: intPart * exponentPart,
      currency: denominationData[i + 1]
    });
  }
  return result;
}

export function formatMessage(code: number, data?: Array<number> | undefined): Array<number> {
  const message: Array<number> = [START_WORD, 0];
  if (code > 0xc6 || code < 0x10) {
    throw new RangeError("Invalid command code!");
  }
  message.push(code);
  if (data !== undefined) {
    message.push(...data);
  }
  message[1] = message.length + 2;
  const calculatedCRC: Array<number> = crc(message);
  return [...message, ...calculatedCRC];
}

export function crc(data: Array<number>): Array<number> {
  const TABLE = [
    0x0000, 0x1189, 0x2312, 0x329b, 0x4624, 0x57ad, 0x6536, 0x74bf, 0x8c48, 0x9dc1, 0xaf5a, 0xbed3, 0xca6c, 0xdbe5, 0xe97e, 0xf8f7, 0x1081, 0x0108, 0x3393, 0x221a,
    0x56a5, 0x472c, 0x75b7, 0x643e, 0x9cc9, 0x8d40, 0xbfdb, 0xae52, 0xdaed, 0xcb64, 0xf9ff, 0xe876, 0x2102, 0x308b, 0x0210, 0x1399, 0x6726, 0x76af, 0x4434, 0x55bd,
    0xad4a, 0xbcc3, 0x8e58, 0x9fd1, 0xeb6e, 0xfae7, 0xc87c, 0xd9f5, 0x3183, 0x200a, 0x1291, 0x0318, 0x77a7, 0x662e, 0x54b5, 0x453c, 0xbdcb, 0xac42, 0x9ed9, 0x8f50,
    0xfbef, 0xea66, 0xd8fd, 0xc974, 0x4204, 0x538d, 0x6116, 0x709f, 0x0420, 0x15a9, 0x2732, 0x36bb, 0xce4c, 0xdfc5, 0xed5e, 0xfcd7, 0x8868, 0x99e1, 0xab7a, 0xbaf3,
    0x5285, 0x430c, 0x7197, 0x601e, 0x14a1, 0x0528, 0x37b3, 0x263a, 0xdecd, 0xcf44, 0xfddf, 0xec56, 0x98e9, 0x8960, 0xbbfb, 0xaa72, 0x6306, 0x728f, 0x4014, 0x519d,
    0x2522, 0x34ab, 0x0630, 0x17b9, 0xef4e, 0xfec7, 0xcc5c, 0xddd5, 0xa96a, 0xb8e3, 0x8a78, 0x9bf1, 0x7387, 0x620e, 0x5095, 0x411c, 0x35a3, 0x242a, 0x16b1, 0x0738,
    0xffcf, 0xee46, 0xdcdd, 0xcd54, 0xb9eb, 0xa862, 0x9af9, 0x8b70, 0x8408, 0x9581, 0xa71a, 0xb693, 0xc22c, 0xd3a5, 0xe13e, 0xf0b7, 0x0840, 0x19c9, 0x2b52, 0x3adb,
    0x4e64, 0x5fed, 0x6d76, 0x7cff, 0x9489, 0x8500, 0xb79b, 0xa612, 0xd2ad, 0xc324, 0xf1bf, 0xe036, 0x18c1, 0x0948, 0x3bd3, 0x2a5a, 0x5ee5, 0x4f6c, 0x7df7, 0x6c7e,
    0xa50a, 0xb483, 0x8618, 0x9791, 0xe32e, 0xf2a7, 0xc03c, 0xd1b5, 0x2942, 0x38cb, 0x0a50, 0x1bd9, 0x6f66, 0x7eef, 0x4c74, 0x5dfd, 0xb58b, 0xa402, 0x9699, 0x8710,
    0xf3af, 0xe226, 0xd0bd, 0xc134, 0x39c3, 0x284a, 0x1ad1, 0x0b58, 0x7fe7, 0x6e6e, 0x5cf5, 0x4d7c, 0xc60c, 0xd785, 0xe51e, 0xf497, 0x8028, 0x91a1, 0xa33a, 0xb2b3,
    0x4a44, 0x5bcd, 0x6956, 0x78df, 0x0c60, 0x1de9, 0x2f72, 0x3efb, 0xd68d, 0xc704, 0xf59f, 0xe416, 0x90a9, 0x8120, 0xb3bb, 0xa232, 0x5ac5, 0x4b4c, 0x79d7, 0x685e,
    0x1ce1, 0x0d68, 0x3ff3, 0x2e7a, 0xe70e, 0xf687, 0xc41c, 0xd595, 0xa12a, 0xb0a3, 0x8238, 0x93b1, 0x6b46, 0x7acf, 0x4854, 0x59dd, 0x2d62, 0x3ceb, 0x0e70, 0x1ff9,
    0xf78f, 0xe606, 0xd49d, 0xc514, 0xb1ab, 0xa022, 0x92b9, 0x8330, 0x7bc7, 0x6a4e, 0x58d5, 0x495c, 0x3de3, 0x2c6a, 0x1ef1, 0x0f78
  ];
  let crc = 0x00000;
  for (const elem of data) {
    crc = (crc >> 8) ^ TABLE[(crc ^ elem) & 0xff];
  }
  const result: Array<number> = [];
  for (let i = 0; i < 2; ++i) {
    result.push((crc >> (8 * i)) & 0xff);
  }
  return result;
}
