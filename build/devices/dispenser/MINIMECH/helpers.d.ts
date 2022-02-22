import { COMMAND_CODES, MINIMECHStatus } from "./constants";
import { IDispenseAnswer } from "../../model/IDispenser";
export declare const isValidResponse: (response: Array<number>) => boolean;
export declare const formatMessage: (command: COMMAND_CODES, data?: Array<number>) => Array<number>;
export declare const parseDispense: (data: Array<number>) => IDispenseAnswer;
export declare const parseStatus: (data: Array<number>) => MINIMECHStatus;
