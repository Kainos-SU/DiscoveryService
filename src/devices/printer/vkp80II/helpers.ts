import { FULL_PRINTER_STATUS, BYTES_AT_STATUS, IPrinterStatusBytes } from "./constants";
import {
  IVKP80FullStatus,
  PaperStatusFields,
  RecoverableStatuses,
  UnrecoverableStatuses,
  UserStatusFields
} from "./types";

export const parseStatus = (message: Array<number>): IVKP80FullStatus => {
  if (message.length > 6) {
    throw new Error("Invalid length of message");
  }

  const DLE = Boolean(message[0] === 0x10);
  const SECOND_BYTE = Boolean(message[1] === 0x0F);
  const result: IVKP80FullStatus = {
    DLE,
    SECOND_BYTE,
    PAPER_STATUS: {} as Record<PaperStatusFields, boolean>,
    USER_STATUS: {} as Record<UserStatusFields, boolean>,
    RECOVERABLE_STATUS: {} as Record<RecoverableStatuses, boolean>,
    UNRECOVERABLE_ERROR: {} as Record<UnrecoverableStatuses, boolean>,
    rawStatus: message
  };

  for (let i = 2, j = 0; i < message.length; i++, j++) {
    const printerStatusKey = BYTES_AT_STATUS[j.toString()];
    Object.entries(FULL_PRINTER_STATUS[printerStatusKey])
    .forEach(([ keyString, value ]) => {
      const key = keyString as any;
      // @ts-ignore
      result[printerStatusKey][key] = Boolean(message[i] & value);
    })
  }

  return result;
}