export declare const STANDART_BYTES: Readonly<{
    SOH: number;
    STX: number;
    EXT: number;
    EOT: number;
    ACK: number;
    NCK: number;
    ID: number;
}>;
export declare const COMMAND_CODES: Readonly<{
    PURGE: number;
    UPPER_DISPENSE: number;
    STATUS: number;
    ROM_VERSION: number;
    LOWER_DISPENSE: number;
    UPPER_AND_LOWER_DISPENSE: number;
    UPPER_TEST_DISPENSE: number;
    LOWER_TEST_DISPENSE: number;
}>;
export declare const CODES_OF_COMMANDS: Map<number, String>;
export declare const CODES_OF_ERRORS: Record<string, number>;
export declare const ERROR_CODES: Map<number, string>;
export declare const STATUS_OF_CASSETTE: Readonly<Record<string, string>>;
export declare const SENSOR_STATUS: Readonly<{
    SENSOR_0: {
        CHK_SENSOR_1: number;
        CHK_SENSOR_2: number;
        DIV_SENSOR_1: number;
        DIV_SENSOR_2: number;
        EJT_SENSOR: number;
        EXIT_SENSOR: number;
        NEARENDO_SENSOR: number;
    };
    SENSOR_1_LCDM_1000: {
        REJECT_TRAY_S_W: number;
        CASSETTE0_SENSOR: number;
        SOL_SENSOR: number;
    };
    SENSOR_1_LCDM_2000: {
        SOL_SENSOR: number;
        CASSETTE0_SENSOR: number;
        CASSETTE1_SENSOR: number;
        CHK_SENSOR_3: number;
        CHK_SENSOR_4: number;
        NEAREND1_SENSOR: number;
        REJECT_TRAY_S_W: number;
    };
}>;
