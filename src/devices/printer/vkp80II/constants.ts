import { PrinterStatusFields, PaperStatusFields, RecoverableStatuses, UnrecoverableStatuses, UserStatusFields } from "./types";

export type IPrinterStatusBytes = Record<PrinterStatusFields, Record<PaperStatusFields, number> | Record<UserStatusFields, number> | Record<RecoverableStatuses, number> | Record<UnrecoverableStatuses, number>>;

export const FULL_PRINTER_STATUS = Object.freeze<IPrinterStatusBytes>({
  PAPER_STATUS: {
    PAPER_NOT_PRESENT: 0x01,
    PAPER_NEAR_END: 0x04,
    TICKET_PRESENT_IN_OUTPUT: 0x20,
    VIRTUAL_PAPER_END: 0x40,
  } as Record<PaperStatusFields, number>,
  USER_STATUS: {
    COVER_OPEN: 0x01,
    COVER_OPEN_1: 0x02,
    SPOOLING: 0x04,
    DRAG_MOTOR_ON: 0x08,
    LF_KEY_PRESSED: 0x20,
    FF_KEY_PRESSED: 0x40
  } as Record<UserStatusFields, number>,
  RECOVERABLE_STATUS: {
    HEAD_TEMPERATURE_ERROR: 0x01,
    RS232_COM_ERROR: 0x02,
    POWER_SUPPLY_VOLTAGE_ERROR: 0x08,
    NOT_ACKNOWLEDGE_COMMAND: 0x20,
    PAPER_JAM: 0x40
  } as Record<RecoverableStatuses, number>,
  UNRECOVERABLE_ERROR: {
    CUTTER_ERROR: 0x01,
    RAM_ERROR: 0x04,
    EEPROM_ERROR: 0x08,
    FLASH_ERROR: 0x40,
  } as Record<UnrecoverableStatuses, number>
});

export const BYTES_AT_STATUS: Record<string, PrinterStatusFields> = {
  0: "PAPER_STATUS",
  1: "USER_STATUS",
  2: "RECOVERABLE_STATUS",
  3: "UNRECOVERABLE_ERROR"
}