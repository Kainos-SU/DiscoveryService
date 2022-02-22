const BYTE_OFFSET_VALUE_MULTIPLIER = 8;
const BYTE_OFFSET_NUMBER_OF_CHANNELS = 11;

type SSPUnitType = "BANKNOTE_VALIDATOR" |
  "ADDON_PRINTER" |
  "SMART_HOPPER" |
  "STAND_ALONE_PRINTER" |
  "SMART_PAYOUT" |
  "SMART_COIN_SYSTEM" |
  "NOTE_FLOAT" |
  "UNKNOWN_TYPE";

export type SSPCurrencyTable = Array<{ denominator: number, value: number }>;

type SSPSetupV6 = {
  unitType:  SSPUnitType;
  firmwareVersion: string;
  countryCode: string;
  valueMultiplier: number;
  numberOfChannels: number;
  currencyTable?: SSPCurrencyTable;
};

export function mergeNumbers (data: Array<number>): number {
  const value = data.reduce((acc, currentValue) => (acc << 8) | currentValue);
  return (value === 0) ? 1 : value;
}

function numberArrayToASCII (data: Array<number>): string {
  return data.reduce((acc, current) => {
    acc += String.fromCharCode(current);
    return acc;
  }, "")
}

export default function parseSetup(data: Array<number>): SSPSetupV6 {
  const dataToParse: Array<number> = data.slice(4, data.length - 2);
  const unitType = parseUnitType(dataToParse[0]);
  const firmwareVersion: string = numberArrayToASCII(dataToParse.slice(1, 5));
  const countryCode: string = numberArrayToASCII(dataToParse.slice(5, 8));
  const currencyTable = parseCurrencyTable(dataToParse);
  const valueMultiplier = mergeNumbers(dataToParse.slice(BYTE_OFFSET_VALUE_MULTIPLIER, BYTE_OFFSET_VALUE_MULTIPLIER + 3));
  const numberOfChannels = dataToParse[BYTE_OFFSET_NUMBER_OF_CHANNELS];
  return {
    countryCode,
    currencyTable,
    firmwareVersion,
    numberOfChannels,
    unitType,
    valueMultiplier
  };
}

function parseCurrencyTable(data: Array<number>): SSPCurrencyTable {
  const valueMultiplier: number = mergeNumbers(data.slice(BYTE_OFFSET_VALUE_MULTIPLIER, BYTE_OFFSET_VALUE_MULTIPLIER + 3));
  const numberOfChannels = data[BYTE_OFFSET_NUMBER_OF_CHANNELS];
  const lengthOfDataToParse = numberOfChannels * 2 + 3;
  const dataToParse = data.slice(BYTE_OFFSET_NUMBER_OF_CHANNELS + 1, BYTE_OFFSET_NUMBER_OF_CHANNELS + lengthOfDataToParse + 2);
  const result: SSPCurrencyTable = [];
  for (let i = 0; i < numberOfChannels; ++i) {
    const value = dataToParse[i] * valueMultiplier;
    result.push({ value, denominator: i + 1 });
  }
  return result;
}

export function parseUnitType (code: number): SSPUnitType {
  let result: SSPUnitType;
  switch (code) {
    case 0x00:
      result = "BANKNOTE_VALIDATOR";
      break;
    case 0x08:
      result = "ADDON_PRINTER";
      break;
    case 0x03:
      result = "SMART_HOPPER";
      break;
    case 0x0B:
      result = "STAND_ALONE_PRINTER";
      break;
    case 0x06:
      result = "SMART_PAYOUT";
      break;
    case 0x09:
      result = "SMART_COIN_SYSTEM";
      break;
    case 0x07:
      result = "NOTE_FLOAT";
      break;
    default:
      result = "UNKNOWN_TYPE";
  }
  return result;
}