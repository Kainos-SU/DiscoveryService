import { BaseAcceptor, IAcceptorStatus } from "../../model/IAcceptor";
import { IStatus } from "../../model/IStatus";
import { ISerialPort } from "../../serial/types";
export default class NV9 extends BaseAcceptor {
    private holding;
    private command;
    private countryCode;
    private rejecting;
    constructor(port: ISerialPort);
    private ok;
    private lastRawResponse;
    private currencyTable;
    private channel;
    private escrow;
    checkStatus(): Promise<IStatus>;
    getAcceptorStatus(): IAcceptorStatus;
    enabled(enabled: boolean): void;
    private sync;
    reset(): void;
    private resetDevice;
    init(): Promise<boolean>;
    private getLastReject;
    private pollAcceptor;
    private accept;
    private reject;
    private fireEvent;
    protected loop(): Promise<void>;
    private send;
}
