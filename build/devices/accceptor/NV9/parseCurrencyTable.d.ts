declare type SSPUnitType = "BANKNOTE_VALIDATOR" | "ADDON_PRINTER" | "SMART_HOPPER" | "STAND_ALONE_PRINTER" | "SMART_PAYOUT" | "SMART_COIN_SYSTEM" | "NOTE_FLOAT" | "UNKNOWN_TYPE";
export declare type SSPCurrencyTable = Array<{
    denominator: number;
    value: number;
}>;
declare type SSPSetupV6 = {
    unitType: SSPUnitType;
    firmwareVersion: string;
    countryCode: string;
    valueMultiplier: number;
    numberOfChannels: number;
    currencyTable?: SSPCurrencyTable;
};
export declare function mergeNumbers(data: Array<number>): number;
export default function parseSetup(data: Array<number>): SSPSetupV6;
export declare function parseUnitType(code: number): SSPUnitType;
export {};
