import { BaseAcceptor, IAcceptorStatus } from "../../model/IAcceptor";
import { IStatus } from "../../model/IStatus";
import { ISerialPort } from "../../serial/types";
export default class ID003 extends BaseAcceptor {
    private currencyTable;
    private currentBill;
    private currentDenominator;
    private currentCurrency;
    private previousStatus;
    private failureReason?;
    private lastRawStatus;
    private ok;
    constructor(port: ISerialPort);
    /**
     * Инициализация ацептора
     */
    init(): Promise<boolean>;
    checkStatus(): Promise<IStatus>;
    getAcceptorStatus(): IAcceptorStatus;
    isMyPort(port: ISerialPort): boolean;
    private fireEvent;
    protected loop(): Promise<void>;
    private reset;
    enabled(enabled: boolean): void;
    private setEnable;
    private setOptionalFunction;
    private setInhibit;
    private send;
    private parseEscrow;
    private reject;
    private accept;
    private getCurrencyTable;
    private setLastStatus;
}
