import { PrinterStatusFields, PaperStatusFields, RecoverableStatuses, UnrecoverableStatuses, UserStatusFields } from "./types";
export declare type IPrinterStatusBytes = Record<PrinterStatusFields, Record<PaperStatusFields, number> | Record<UserStatusFields, number> | Record<RecoverableStatuses, number> | Record<UnrecoverableStatuses, number>>;
export declare const FULL_PRINTER_STATUS: Readonly<IPrinterStatusBytes>;
export declare const BYTES_AT_STATUS: Record<string, PrinterStatusFields>;
