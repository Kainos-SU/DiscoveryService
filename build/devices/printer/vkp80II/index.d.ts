import { ISerialPort } from "../../serial/types";
import { BasePrinter, IPrinterStatus } from "../../model/IPrinter";
import { IStatus } from "../../model/IStatus";
import { IVKP80FullStatus } from "./types";
export default class VKP80 extends BasePrinter {
    private resolvePaperInOutput?;
    constructor(port: ISerialPort);
    checkStatus(): Promise<IStatus>;
    cut(align?: boolean): Promise<void>;
    reset(): Promise<void>;
    init(): Promise<boolean>;
    protected loop(): Promise<void>;
    printBarCode(code: string): Promise<void>;
    printLine(message: string): Promise<void>;
    romVersion(): Promise<IStatus>;
    private paperRemoved;
    paperRemovedFromInput(): Promise<void>;
    getStatus(): Promise<IVKP80FullStatus>;
    changeCode(message: string): Uint16Array;
    getPrinterStatus(): IPrinterStatus;
    private fireEvent;
}
