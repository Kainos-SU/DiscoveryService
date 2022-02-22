export declare const CODES_OF_TRANSMITTER: Readonly<{
    STATUS_REQUEST: number;
    ACK: number;
    OPERATION_COMMAND: {
        RESET: number;
        STACK_1: number;
        STACK_2: number;
        RETURN: number;
        HOLD: number;
        WAIT: number;
    };
    SETTING_COMMAND: {
        ENABLE_DISABLE: number;
        SECURITY: number;
        COMMUNICATION_MODE: number;
        INHIBIT_ACCEPTOR: number;
        DIRECTION: number;
        OPTIONAL_FUNCTION: number;
    };
    SETTING_STATUS_REQUEST: {
        ENABLE_DISABLE: number;
        SECURITY: number;
        COMMUNICATION_MODE: number;
        INHIBIT_ACCEPTOR: number;
        DIRECTION: number;
        OPTIONAL_FUNCTION: number;
        VERSION_REQUEST: number;
        BOOT_VERSION_REQUEST: number;
        CURRENCY_ASSIGN_REQUEST: number;
    };
}>;
export declare const RESIVER_RESPONSES: Readonly<{
    STATUS: {
        ENABLE_IDLING: number;
        ACCEPTING: number;
        ESCROW: number;
        STACKING: number;
        VEND_VALID: number;
        STACKED: number;
        REJECTING: number;
        RETURNING: number;
        HOLDING: number;
        DISABLED_INHIBIT: number;
        INITIALIZE: number;
    };
    POWER_UP_STATUS: {
        POWER_UP: number;
        POWER_UP_WITH_BILL_IN_ACCEPTOR: number;
        POWER_UP_WITH_BILL_IN_STACKER: number;
    };
    ERROR_STATUS: {
        STACKER_FULL: number;
        STACKER_OPEN: number;
        JAM_IN_ACCEPTOR: number;
        JAM_IN_STACKER: number;
        PAUSE: number;
        CHEATED: number;
        FAILURE: number;
        COMMUNICATION_ERROR: number;
    };
    POLL_REQUEST: number;
    RESPONSE_TO_OPERATION_COMMAND: {
        ACK: number;
        INVALID_COMMAND: number;
    };
    RESPONSE_TO_SETTING_COMMAND: {
        ENABLE_DISABLE: number;
        SECURITY: number;
        COMMUNICATION_MODE: number;
        INHIBIT_ACCEPTOR: number;
        DIRECTION: number;
        OPTIONAL_FUNCTION: number;
        VERSION_INFORMATION: number;
        BOOT_VERSION_INFORMATION: number;
        DENOMINATION_DATA: number;
    };
}>;
export declare const ENQ = 5;
export declare const CODES_OF_RESSIVER: Readonly<{
    STATUS: Map<number, string>;
    POWER_UP_STATUS: Map<number, string>;
    ERROR_STATUS: Map<number, string>;
    RESPONSE_TO_OPERATION_COMMAND: Map<number, string>;
    RESPONSE_TO_SETTING_COMMAND: Map<number, string>;
}>;
export declare const FAILURE_CODES: Map<number, string>;
export declare const REJECT_REASONS: Map<number, string>;
export declare const START_WORD = 252;
export declare const COUNTRY_TYPE_TABLE: Map<number, string>;
export declare type CurrencyRecord = {
    denominator: number;
    value: number;
    currency: number;
};
export declare function isValidResponse(message: Array<number>): boolean;
export declare function isValidCommandCode(code: number): boolean;
export declare function parseCurrencyTable(raw: Array<number>): Array<{
    denominator: number;
    value: number;
    currency: number;
}>;
export declare function formatMessage(code: number, data?: Array<number> | undefined): Array<number>;
export declare function crc(data: Array<number>): Array<number>;
