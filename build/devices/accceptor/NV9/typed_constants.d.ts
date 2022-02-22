export declare enum HOST_COMMANDS {
    NO_COMMAND = 0,
    RESET = 1,
    SET_INHIBITS = 2,
    SETUP_REQUEST = 5,
    POLL = 7,
    REJECT = 8,
    DISABLE = 9,
    ENABLE = 10,
    GET_SERIAL_NUMBER = 12,
    SYNC = 17,
    LAST_REJECT_CODE = 23,
    HOLD = 24
}
export declare const START_WORD = 127;
export declare const GENERIC_RESPONSES: Readonly<Record<GenericResponse, number>>;
export declare const ACCEPTOR_EVENTS: Readonly<Record<AcceptorEvents, number>>;
export declare const REJECT_REASONS: Map<number, string>;
declare type AcceptorEvents = "SLAVE_RESET" | "READ" | "NOTE_CREDIT" | "REJECTING" | "REJECTED" | "STACKING" | "STACKED" | "UNSAFE_JAM" | "DISABLED" | "FRAUD_ATTEMPTS" | "STACKER_FULL" | "NOTE_CLEARED_FROM_FRONT" | "NOTE_CLEARED_INTO_CASHBOX" | "CHANNEL_DISABLE" | "INITIALISING" | "TICKET_PRINTING" | "TICKED_PRINTED" | "TICKET_PRINTING_ERROR" | "PRINT_HALTED" | "TICKED_IN_BEZEL" | "PRINTED_TO_CASHBOX" | "TICKET_IN_BEZEL_AT_STARTUP" | "REFILL_NOTE_CREDIT";
declare type GenericResponse = "OK" | "COMMAND_NOT_KNOWN" | "WRONG_No_PARAMETERS" | "PARAMETERS" | "COMMAND_CANNOT_BE_PROCESSED" | "SOFTWARE_ERROR" | "FAIL" | "KEY_NOT_SET";
export {};
