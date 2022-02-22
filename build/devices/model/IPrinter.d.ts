import { IStatus } from "./IStatus";
import { ISerialPort } from "../serial/types";
import BaseDevice from "./BaseDevice";
export interface IPrinter {
    printBarCode(code: string): boolean | Promise<void>;
    cut(align?: boolean): boolean | Promise<void>;
    printLine(message: String): boolean | Promise<void>;
    paperRemovedFromInput?(): Promise<void>;
}
export interface IPrinterStatus {
    paperInOutput?: boolean;
    paperJam?: boolean;
    nearEnd?: boolean;
    paperNotPresent?: boolean;
    coverOpen?: boolean;
    status: string;
    type: string;
}
export declare abstract class BasePrinter extends BaseDevice implements IPrinter {
    protected paperJam: boolean;
    protected nearEnd: boolean;
    protected paperNotPresent: boolean;
    protected coverOpen: boolean;
    protected paperInOutput?: boolean;
    protected constructor(port: ISerialPort);
    abstract printLine(message: String): boolean | Promise<void>;
    abstract printBarCode(code: string): boolean | Promise<void>;
    abstract cut(align?: boolean): boolean | Promise<void>;
    abstract romVersion(): Promise<IStatus>;
    abstract init(): Promise<boolean>;
    isMyPort(port: ISerialPort): boolean;
    abstract reset(): Promise<void>;
    abstract checkStatus(): Promise<IStatus>;
    abstract getPrinterStatus(): IPrinterStatus;
}
