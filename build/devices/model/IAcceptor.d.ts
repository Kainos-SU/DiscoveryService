import { ISerialPort } from "../serial/types";
import BaseDevice from "./BaseDevice";
export interface IAcceptorActions {
    denominator: number;
    currency?: string;
    value?: number;
    accept?(): void;
    reject?(): void;
}
export interface IAcceptorStatus {
    ok: boolean;
    status: string;
    isFull: boolean;
    type: string;
}
export interface IAcceptorOnRejectActions {
    reason: string;
    codeOfReject?: number;
}
export interface IAcceptorOnErrorActions {
    error: string;
    description: string;
    reset: () => void;
}
export interface IAcceptor {
}
export declare abstract class BaseAcceptor extends BaseDevice implements IAcceptor {
    protected events: Map<string, Array<(act: IAcceptorActions | IAcceptorOnErrorActions | IAcceptorOnRejectActions) => void>>;
    protected isFull: boolean;
    protected connected: boolean;
    protected constructor(port: ISerialPort);
    abstract init(): Promise<boolean>;
    abstract getAcceptorStatus(): IAcceptorStatus;
}
