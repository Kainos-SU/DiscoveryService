import { SerialPortOption } from "../../serial/types";
export declare type COMMANDS = "STATUS" | "PURGE" | "DISPENSE" | "TEST_DISPENSE" | "RESET" | "LAST_STATUS" | "CONFIGURATIONS_STATUS" | "DOUBLE_DETECT_DIAGNOSTICS" | "SENSOR_DIAGNOSTICS" | "SINGLE_NOTE_DISPENSE" | "SINGLE_NOTE_EJECT" | "READ_DATA" | "WRITE_DATA" | "TEST";
export declare enum COMMAND_CODES {
    STATUS = 64,
    PURGE = 65,
    DISPENSE = 66,
    TEST_DISPENSE = 67,
    RESET = 68,
    LAST_STATUS = 69,
    CONFIGURATIONS_STATUS = 70,
    DOUBLE_DETECT_DIAGNOSTICS = 71,
    SENSOR_DIAGNOSTICS = 72,
    SINGLE_NOTE_DISPENSE = 74,
    SINGLE_NOTE_EJECT = 75,
    TEST = 84
}
export declare const SYSTEM_COMMANDS: Record<"READ_DATA" | "WRITE_DATA", Array<number>>;
export declare enum STANDARD_BYTES {
    "START_OF_HEADER" = 1,
    "START_OF_TEXT" = 2,
    "END_OF_TEXT" = 3,
    "START_OF_TRANSMISSION" = 4,
    "COMM_IDENTITY" = 48
}
export declare const STATUS_CODES: Map<number, string>;
export declare type MINIMECHStatus = {
    FEED_SENSOR_BLOCKED: boolean;
    EXIT_SENSOR_BLOCKED: boolean;
    RESET_SINCE_LAST_STATUS_MESSAGE: boolean;
    TIMING_WHEEL_SENSOR_BLOCKED: boolean;
    CALIBRATING_DOUBLE_DETECT: boolean;
    AVERAGE_THICKNESS: number;
    AVERAGE_LENGTH: number;
};
export declare const STATUS_BIT_SHIFT: {
    FEED_SENSOR_BLOCKED: number;
    EXIT_SENSOR_BLOCKED: number;
    RESET_SINCE_LAST_STATUS_MESSAGE: number;
    TIMING_WHEEL_SENSOR_BLOCKED: number;
    CALIBRATING_DOUBLE_DETECT: number;
};
export declare const PORT_SETTINGS: SerialPortOption;
