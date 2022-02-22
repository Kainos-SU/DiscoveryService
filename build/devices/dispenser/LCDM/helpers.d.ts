import { ILCDMPortAnswer, ILCDMStatus } from "./types";
import { IDispenseAnswer } from "../../model/IDispenser";
export declare function calculateCRC(message: Array<number>): number;
export declare function checkCRC(message: Array<number>): boolean;
export declare function handleLDCMAnswer(response: Array<number>): ILCDMPortAnswer;
export declare function parseStatus(response: Array<number>, type: string): ILCDMStatus;
export declare function checkSensor0(code: number): [string, {
    [s: string]: boolean;
}];
export declare function checkSensor1(code: number, type: string): [string, {
    [s: string]: boolean;
}];
export declare function parseDispense(response: Array<number>): IDispenseAnswer;
