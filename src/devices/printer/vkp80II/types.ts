export type PrinterStatusFields = "PAPER_STATUS" | "USER_STATUS" | "RECOVERABLE_STATUS" | "UNRECOVERABLE_ERROR";
export type PaperStatusFields = "PAPER_NOT_PRESENT" | "PAPER_NEAR_END" | "TICKET_PRESENT_IN_OUTPUT" | "VIRTUAL_PAPER_END";
export type UserStatusFields = "COVER_OPEN" | "COVER_OPEN_1" | "SPOOLING" | "DRAG_MOTOR_ON" | "LF_KEY_PRESSED" | "FF_KEY_PRESSED";
export type RecoverableStatuses = "HEAD_TEMPERATURE_ERROR" | "RS232_COM_ERROR" | "POWER_SUPPLY_VOLTAGE_ERROR" | "NOT_ACKNOWLEDGE_COMMAND" | "PAPER_JAM";
export type UnrecoverableStatuses = "CUTTER_ERROR" | "RAM_ERROR" | "EEPROM_ERROR" | "FLASH_ERROR";

export interface IVKP80FullStatus extends Record<PrinterStatusFields | "DLE" | "SECOND_BYTE", boolean | Record<string, boolean>> {
  DLE: boolean;
  SECOND_BYTE: boolean;

  PAPER_STATUS: Record<PaperStatusFields, boolean>;

  USER_STATUS: Record<UserStatusFields, boolean>;

  RECOVERABLE_STATUS: Record<RecoverableStatuses, boolean>;

  UNRECOVERABLE_ERROR: Record<UnrecoverableStatuses, boolean>;

  rawStatus: Array<number>;
}