export enum HOST_COMMANDS {
  NO_COMMAND= 0x00,
  RESET = 0x01,
  SET_INHIBITS = 0x02,
  SETUP_REQUEST = 0x05,
  POLL =  0x07,
  REJECT = 0x08,
  DISABLE = 0x09,
  ENABLE = 0x0A,
  GET_SERIAL_NUMBER = 0x0C,
  SYNC = 0x11,
  LAST_REJECT_CODE = 0x17,
  HOLD = 0x18,
}

export const START_WORD = 0x7F;

export const GENERIC_RESPONSES = Object.freeze<Record<GenericResponse, number>>({
  OK: 0xF0,
  COMMAND_NOT_KNOWN: 0xF2,
  WRONG_No_PARAMETERS: 0xF3,
  PARAMETERS: 0xF4,
  COMMAND_CANNOT_BE_PROCESSED: 0xF5,
  SOFTWARE_ERROR: 0xF6,
  FAIL: 0xF8,
  KEY_NOT_SET: 0xFA
});

export const ACCEPTOR_EVENTS = Object.freeze<Record<AcceptorEvents, number>>({
  SLAVE_RESET: 0xF1,
  READ: 0xEF, // need to bubble event
  NOTE_CREDIT: 0xEE, // need to bubble event
  REJECTING: 0xED,
  REJECTED: 0xEC,  // need to bubble event
  STACKING: 0xCC,
  STACKED: 0xEB,
  UNSAFE_JAM: 0xE9, // need to fire error
  DISABLED: 0xE8,
  FRAUD_ATTEMPTS: 0xE6,  // need to fire error
  STACKER_FULL: 0xE7,  // need to up flag IsFull
  NOTE_CLEARED_FROM_FRONT: 0xE1,
  NOTE_CLEARED_INTO_CASHBOX: 0xE2,
  CHANNEL_DISABLE: 0xB5,
  INITIALISING: 0xB6,
  TICKET_PRINTING: 0xA5,
  TICKED_PRINTED: 0xA6,
  TICKET_PRINTING_ERROR: 0xA8,
  PRINT_HALTED: 0xAE,
  TICKED_IN_BEZEL: 0xAD,
  PRINTED_TO_CASHBOX: 0xAF,
  TICKET_IN_BEZEL_AT_STARTUP: 0xA7,
  REFILL_NOTE_CREDIT: 0x9E
});

export const REJECT_REASONS = new Map<number, string>([
  [0x00, "NOTE ACCEPTED"],
  [0x01, "LENGTH FAIL"],
  [0x02, "AVERAGE FAIL"],
  [0x03, "COASTLINE FAIL"],
  [0x04, "GRAPH FAIL"],
  [0x05, "BURIED FAIL"],
  [0x06, "CHANNEL INHIBIT"],
  [0x07, "SECOND NOTE DETECT"],
  [0x08, "REJECT BY HOST"],
  [0x09, "CROSS CHANNEL DETECTED"],
  [0x0A, "REAR SENSOR ERROR"],
  [0x0B, "NOTE TOO LONG"],
  [0x0C, "DISABLED BY HOST"],
  [0x0D, "SLOW MECH"],
  [0x0E, "STRIM ATTEMPT"],
  [0x0F, "FRAUD CHANNEL"],
  [0x10, "NO NOTES DETECTED"],
  [0x11, "PEACK DETECT FAIL"],
  [0x12, "TWISTED NOTE REJECT"],
  [0x13, "ESCROW TIME-OUT"],
  [0x14, "BAR CODE SCAN FAIL"],
  [0x15, "NO CAM ACTIVE"],
  [0x16, "SLOT FAIL 1"],
  [0x17, "SLOT FAIL 2"],
  [0x18, "LENS OVERSAMPLE"],
  [0x19, "WIDTH DETECTION FAIL"],
  [0x1A, "SHORT NOTE DETECT"],
  [0x1B, "PAYOUT NOTE"],
  [0x1C, "DOUBLE NOTE DETECT"],
  [0x1D, "UNABLE TO STACK"],
  [0x1F, "Credit card Detected"]
]);

type AcceptorEvents = "SLAVE_RESET" |
  "READ" |
  "NOTE_CREDIT" |
  "REJECTING" |
  "REJECTED" |
  "STACKING" |
  "STACKED" |
  "UNSAFE_JAM" |
  "DISABLED" |
  "FRAUD_ATTEMPTS" |
  "STACKER_FULL" |
  "NOTE_CLEARED_FROM_FRONT" |
  "NOTE_CLEARED_INTO_CASHBOX" |
  "CHANNEL_DISABLE" |
  "INITIALISING" |
  "TICKET_PRINTING" |
  "TICKED_PRINTED" |
  "TICKET_PRINTING_ERROR" |
  "PRINT_HALTED" |
  "TICKED_IN_BEZEL" |
  "PRINTED_TO_CASHBOX" |
  "TICKET_IN_BEZEL_AT_STARTUP" |
  "REFILL_NOTE_CREDIT";

type GenericResponse = "OK" |
  "COMMAND_NOT_KNOWN" |
  "WRONG_No_PARAMETERS" |
  "PARAMETERS" |
  "COMMAND_CANNOT_BE_PROCESSED" |
  "SOFTWARE_ERROR" |
  "FAIL" |
  "KEY_NOT_SET";