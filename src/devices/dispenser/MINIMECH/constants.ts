import { SerialPortOption } from "../../serial/types";

export type COMMANDS = "STATUS" |
  "PURGE" |
  "DISPENSE" |
  "TEST_DISPENSE" |
  "RESET" |
  "LAST_STATUS" |
  "CONFIGURATIONS_STATUS" |
  "DOUBLE_DETECT_DIAGNOSTICS" |
  "SENSOR_DIAGNOSTICS" |
  "SINGLE_NOTE_DISPENSE" |
  "SINGLE_NOTE_EJECT" |
  "READ_DATA" |
  "WRITE_DATA" |
  "TEST";

export enum COMMAND_CODES {
  STATUS = 0x40,
  PURGE = 0x41,
  DISPENSE = 0x42,
  TEST_DISPENSE = 0x43,
  RESET = 0x44,
  LAST_STATUS = 0x45,
  CONFIGURATIONS_STATUS = 0x46,
  DOUBLE_DETECT_DIAGNOSTICS = 0x47,
  SENSOR_DIAGNOSTICS = 0x48,
  SINGLE_NOTE_DISPENSE = 0x4A,
  SINGLE_NOTE_EJECT = 0x4B,
  TEST = 0x54
}

export const SYSTEM_COMMANDS: Record<"READ_DATA" | "WRITE_DATA", Array<number>> = Object.freeze({
  READ_DATA: [0x52, 0x44],
  WRITE_DATA: [0x57, 0x44]
})

export enum STANDARD_BYTES {
  "START_OF_HEADER" = 0x01,
  "START_OF_TEXT" = 0x02,
  "END_OF_TEXT" = 0x03,
  "START_OF_TRANSMISSION" = 0x04,
  "COMM_IDENTITY" = 0x30
}

export const STATUS_CODES: Map<number, string> = new Map([
  [0x20, "Good Operation"],
  [0x21, "Feed Failure"],
  [0x24, "Mistracked Note At Exit"],
  [0x25, "Too Long At Exit"],
  [0x26, "Blocked Exit"],
  [0x2A, "Transport Error"],
  [0x2C, "Double Detect Error"],
  [0x2D, "Diverter Error"],
  [0x2E, "Wrong Count"],
  [0x2F, "Note Missing At DD"],
  [0x30, "Reject Rate Exceeded"],
  [0x34, "Non Volatile RAM Error"],
  [0x36, "Operation Timeout"],
  [0x37, "Internal Que Error"],
  [0x4F, "Invalid Command"]
]);

export type MINIMECHStatus = {
  FEED_SENSOR_BLOCKED: boolean;
  EXIT_SENSOR_BLOCKED: boolean;
  RESET_SINCE_LAST_STATUS_MESSAGE: boolean;
  TIMING_WHEEL_SENSOR_BLOCKED: boolean;
  CALIBRATING_DOUBLE_DETECT: boolean;
  AVERAGE_THICKNESS: number;
  AVERAGE_LENGTH: number;
}

export const STATUS_BIT_SHIFT = {
  FEED_SENSOR_BLOCKED: 0x01,
  EXIT_SENSOR_BLOCKED: 0x02,
  RESET_SINCE_LAST_STATUS_MESSAGE: 0x08,
  TIMING_WHEEL_SENSOR_BLOCKED: 0x10,
  CALIBRATING_DOUBLE_DETECT: 0x10
}

export const PORT_SETTINGS: SerialPortOption = {
  baudRate: 4800,
  parity: "even",
}