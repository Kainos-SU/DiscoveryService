import { BITS_DISP0, BITS_DISP1, STAT_BITS } from "./types";
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
    RESET: number;
    STATUS: number;
    PURGE: number;
    DISPENSE: number;
    TEST_DISPENSE: number;
    LAST_STATUS: number;
    SENSOR_DIAGNOSTICS: number;
}>;
export declare const ERROR_CODES: Map<number, string>;
export declare const DISP0_BIT_MASK: Readonly<Record<BITS_DISP0, {
    state: string;
    bit: number;
}>>;
export declare const DISP1_BIT_MASK: Readonly<Record<BITS_DISP1, {
    state: string;
    bit: number;
}>>;
export declare const STAT_BIT_MASK: Readonly<Record<STAT_BITS, {
    state: string;
    bit: number;
}>>;
export declare const COEFFICIENT_OF_VALUES = 32;
export declare const TYPE_CONSTANT = 48;
