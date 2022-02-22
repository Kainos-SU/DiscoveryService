import { IStatus } from "../../model/IStatus";
import { BaseDispenser, IDispenseAnswer, IDispenserStatus } from "../../model/IDispenser";
import { ISerialPort } from "../../serial/types";
export default class LCDM extends BaseDispenser {
    private errorStatus;
    constructor(port: ISerialPort);
    init(): Promise<boolean>;
    private checkDeviceType;
    protected loop(): Promise<undefined>;
    private fireEvent;
    purge(): Promise<IStatus>;
    romVersion(): Promise<IStatus>;
    checkStatus(): Promise<IStatus>;
    /**
     * Отправка команды в диспенсер
     * @param cmd команда
     * @param data дополнительные байты пакета
     * @param timeout через которое прекращается чтение
     * @private
     */
    private sendNew;
    private errorCheck;
    private setCassettesStatus;
    private formatDispenseMessage;
    testDispense(upper?: boolean): Promise<IStatus>;
    dispense(count: number, cassetteNumber?: number): Promise<IDispenseAnswer>;
    multiDispense(dispenseData: Array<{
        count: number;
        cassetteNumber: number;
    }>): Promise<IDispenseAnswer>;
    getDispenserStatus(): IDispenserStatus;
}
