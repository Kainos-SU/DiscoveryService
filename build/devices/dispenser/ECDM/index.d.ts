import { ISerialPort } from "../../serial/types";
import { BaseDispenser, IDispenseAnswer, IDispenserStatus } from "../../model/IDispenser";
import { IStatus } from "../../model/IStatus";
import { IECDMPortAnswer } from "./types";
export default class ECDM extends BaseDispenser {
    constructor(port: ISerialPort);
    init(): Promise<boolean>;
    reset(): Promise<IECDMPortAnswer>;
    checkStatus(): Promise<IStatus>;
    purge(): Promise<IStatus>;
    romVersion(): Promise<IStatus>;
    dispense(count: number, cassetteNumber: number): Promise<IDispenseAnswer>;
    multiDispense(dispenseData: Array<{
        count: number;
        cassetteNumber: number;
    }>): Promise<IDispenseAnswer>;
    protected loop(): Promise<void>;
    private fireEvent;
    private purgeDispenser;
    private getECDMStatus;
    testDispense(): Promise<IStatus>;
    private prepareMessage;
    private send;
    getDispenserStatus(): IDispenserStatus;
}
