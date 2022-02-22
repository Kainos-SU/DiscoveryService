import { HOST_COMMANDS } from "./typed_constants";
export declare function calculateCrc(data: Array<number>): [number, number];
export declare function checkCrc(data: Array<number>): boolean;
export declare function formatMessage(command: HOST_COMMANDS, dataBytes?: Array<number>, resetForSync?: boolean): Array<number>;
