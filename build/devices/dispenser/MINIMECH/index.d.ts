import { BaseDispenser, IDispenseAnswer, IDispenserStatus } from "../../model/IDispenser";
import { ISerialPort } from "../../serial/types";
import { IStatus } from "../../model/IStatus";
export default class MINIMECH extends BaseDispenser {
    private isEmpty;
    constructor(port: ISerialPort);
    checkStatus(): Promise<IStatus>;
    dispense(count: number, cassetteNumber: number): Promise<IDispenseAnswer>;
    private billDispense;
    getDispenserStatus(): IDispenserStatus;
    init(): Promise<boolean>;
    protected loop(): void;
    multiDispense(dispenseData: Array<{
        count: number;
        cassetteNumber: number;
    }>): Promise<IDispenseAnswer>;
    purge(): Promise<IStatus>;
    romVersion(): Promise<IStatus>;
    testDispense(): Promise<IStatus>;
    private reset;
    private sendMessage;
}
