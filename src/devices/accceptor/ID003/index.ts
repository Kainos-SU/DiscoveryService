import { BaseAcceptor, IAcceptorStatus } from "../../model/IAcceptor";
import { synchronized } from "d4c-queue";
import {
  START_WORD,
  ENQ,
  CODES_OF_TRANSMITTER,
  CODES_OF_RESSIVER,
  RESIVER_RESPONSES,
  FAILURE_CODES,
  REJECT_REASONS,
  parseCurrencyTable,
  isValidResponse,
  formatMessage,
  COUNTRY_TYPE_TABLE,
  CurrencyRecord
} from "./constants";
import { IStatus } from "../../model/IStatus";
import { ISerialPort, SerialPortOption } from "../../serial/types";
import { Logger } from "../../../helpers/logger";

const log = new Logger("[ID003]");

const portParameters: SerialPortOption = {
  baudRate: 9600,
  bufferSize: 255,
  dataBit: 8,
  flowControl: "none",
  parity: "even",
  stopBits: 1
};

export default class ID003 extends BaseAcceptor {
  private currencyTable: Array<CurrencyRecord> = [];
  private currentBill: number = 0;
  private currentDenominator: number = 0;
  private currentCurrency: string = "MNT";
  private previousStatus: number = 0;
  private failureReason?: string;
  private lastRawStatus: Array<number> = [];
  private ok: boolean = false;

  constructor(port: ISerialPort) {
    super(port);
    this.deviceType = "ID003";
  }

  /**
   * Инициализация ацептора
   */
  public async init(): Promise<boolean> {
    if (!this.port) return false;
    try {
      await this.port.open(portParameters);
    } catch (err) {
      // log.debug("Error while opening port", err);
      try {
        // log.debug("[ID003] Try to close port", this.port.port);
        await this.port.close();
      } catch (err) {
        // log.debugError(err);
      }
      return false;
    }

    let response: Array<number>;
    try {
      response = await this.send(CODES_OF_TRANSMITTER.STATUS_REQUEST);
    } catch {
      // log.debug("[ID003] Try to close port ", this.port.port);
      await this.port.close();
      return false;
    }

    const responseIsValid = isValidResponse(response);

    if (!responseIsValid) {
      // log.debug("[ID003] Init is failed!");
      await this.port.close();
      return false;
    }
    try {
      await this.getCurrencyTable();
    } catch {
      log.warning("Error getting currency table!");
    }
    if (!CODES_OF_RESSIVER.POWER_UP_STATUS.has(response[2])) {
      this.initLoop(500);
      return true;
    }
    if (CODES_OF_RESSIVER.ERROR_STATUS.has(response[2])) {
      log.warning("Acceptor at initialize in error! Try to reset!");
      await this.reset();
      return true;
    }
    try {
      response = await this.reset();
      response = await this.setEnable();
      response = await this.setOptionalFunction();
      response = await this.setInhibit();
    } catch (err) {
      log.error("Initialization Error! " + err);
      await this.port.close();
      return false;
    }
    let prevStatus = response[2];
    while (true) {
      response = await this.send(CODES_OF_TRANSMITTER.STATUS_REQUEST);
      if (prevStatus === RESIVER_RESPONSES.STATUS.INITIALIZE && response[2] !== RESIVER_RESPONSES.STATUS.INITIALIZE) {
        break;
      }
      prevStatus = response[2];
    }
    this.connected = true;
    this.initLoop(200);
    return true;
  }

  public checkStatus(): Promise<IStatus> {
    return Promise.resolve( {
        ok: this.ok,
        connected: this.connected,
        status: this.lastStatus,
        enabled: this.enable,
        rawResponse: this.lastRawStatus
      })
  }

  public getAcceptorStatus(): IAcceptorStatus {
    return {
      ok: this.ok,
      status: this.lastStatus,
      isFull: this.isFull,
      type: this.deviceType
    }
  }

  public isMyPort(port: ISerialPort): boolean {
    return this.port?.port === port.port;
  }

  private fireEvent(event: string, ...params: any[]) {
    if (!this.events.has(event)) {
      return;
    }
    log.info("Fired Event: " + event);
    for (const handler of this.events.get(event) || []) {
      switch (event) {
        case "rejected":
          handler({
            reason: params[0],
            codeOfReject: params[1]
          });
          break;
        case "returned":
        case "billStacked":
        case "billIn":
          handler({
            value: this.currentBill,
            denominator: this.currentDenominator,
            currency: this.currentCurrency,
            reject: async () => await this.reject(),
            accept: async () => await this.accept()
          });
          break;
        case "onError":
          const error = CODES_OF_RESSIVER.ERROR_STATUS.get(this.previousStatus) || "";
          handler({
            error: error,
            description: this.failureReason || error,
            reset: () => {
              this.reset();
            }
          });
          break;
      }
    }
  }

  protected async loop(): Promise<void> {
    this.failureReason = undefined;
    let response: Array<number>;
    try {
      response = await this.send(CODES_OF_TRANSMITTER.STATUS_REQUEST);
    } catch (err) {
      this.lastStatus = "Acceptor not available!";
      this.ok = false;
      this.connected = false;
      this.lastRawStatus = [];
      log.error("Error ocupy in loop: ", err);
      return;
    }

    if (!isValidResponse(response)) {
      this.ok = false;
      this.connected = true;
      this.lastStatus = "Invalid Response";
      this.lastRawStatus = response;
      return;
    }

    this.lastRawStatus = response;
    this.connected = true;
    if (RESIVER_RESPONSES.ERROR_STATUS.STACKER_FULL === response[2]) {
      this.isFull = true;
    } else if (RESIVER_RESPONSES.ERROR_STATUS.STACKER_OPEN === response[2]) {
      this.isFull = false;
    }

    if (!this.enable && RESIVER_RESPONSES.STATUS.ENABLE_IDLING === response[2]) {
      response = await this.setInhibit();
    }
    if (this.enable && RESIVER_RESPONSES.STATUS.DISABLED_INHIBIT === response[2]) {
      response = await this.setInhibit([0x00]);
    }

    if (RESIVER_RESPONSES.STATUS.VEND_VALID === response[2]) {
      await this.port?.write(formatMessage(CODES_OF_TRANSMITTER.ACK));
      return;
    }
    // log.debug("[ID003] loop", "Prev status:", this.previousStatus, "Current Status: " + response.map((el) => el.toString(16)).join(", "));

    if (response[2] === this.previousStatus) {
      return;
    }
    this.setLastStatus(response[2]);
    // log.debug("Current status: ", this.lastStatus);
    this.previousStatus = response[2];
    if (CODES_OF_RESSIVER.ERROR_STATUS.has(response[2])) {
      log.warning("Error status: ", response);
      if (RESIVER_RESPONSES.ERROR_STATUS.FAILURE === response[2]) {
        this.failureReason = FAILURE_CODES.get(response[3]);
        this.lastStatus += "\n" + this.failureReason;
      }
      this.fireEvent("onError");
    }
    if (RESIVER_RESPONSES.STATUS.STACKED === response[2]) {
      this.fireEvent("billStacked");
    }
    if (RESIVER_RESPONSES.STATUS.REJECTING === response[2]) {
      log.warning("[ID003] Rejected", REJECT_REASONS.get(response[3]));
      this.fireEvent("rejected", `[ID003] Rejected ${REJECT_REASONS.get(response[3])}`, response[3]);
      this.lastStatus += "\n" + REJECT_REASONS.get(response[3]);
    }
    if (RESIVER_RESPONSES.STATUS.RETURNING === response[2]) {
      this.fireEvent("returned");
    }
    if (RESIVER_RESPONSES.STATUS.ESCROW === response[2] && this.enable) {
      const value = this.parseEscrow(response);
      this.currentBill = value.value;
      this.currentCurrency = COUNTRY_TYPE_TABLE.get(value.currency) || this.currentCurrency;
      this.currentDenominator = (!value ? response[3] : value.denominator) - 0x60;
      await this.send(CODES_OF_TRANSMITTER.OPERATION_COMMAND.HOLD);
      this.fireEvent("billIn");
    }
  }

  private reset(): Promise<Array<number>> {
    return this.send(CODES_OF_TRANSMITTER.OPERATION_COMMAND.RESET);
  }

  public enabled(enabled: boolean) {
    super.enabled(enabled);
    this.setInhibit(this.enable ? [0x00] : [0x00]);
  }

  private setEnable(data: Array<number> = [0x00, 0x00]): Promise<Array<number>> {
    return this.send(CODES_OF_TRANSMITTER.SETTING_COMMAND.ENABLE_DISABLE, data);
  }

  private setOptionalFunction(): Promise<Array<number>> {
    return this.send(CODES_OF_TRANSMITTER.SETTING_COMMAND.OPTIONAL_FUNCTION, [0xff, 0xff]);
  }

  private setInhibit(data: Array<number> = [0xff]): Promise<Array<number>> {
    return this.send(CODES_OF_TRANSMITTER.SETTING_COMMAND.INHIBIT_ACCEPTOR, data);
  }

  @synchronized
  private async send(code: number, data?: Array<number>): Promise<Array<number>> {
    const message: Array<number> = formatMessage(code, data);
    // log.debug("Writing in port" + this.port.port);
    await this.port?.write(message);
    let response: Array<number> = [];
    try {
      response = (await this.port?.read()) || [];
      // log.debug("Response", response);
    } catch (err) {
      console.error("[ID003]", err);
    }
    if (!isValidResponse(response)) {
      return Promise.reject(new Error("Invalid response!"));
    }
    return response;
  }

  private parseEscrow(response: Array<number>): CurrencyRecord {
    if (RESIVER_RESPONSES.STATUS.ESCROW !== response[2]) {
      throw new Error("[ID003] Invalid status. Not ESCROW!");
    }
    let value: CurrencyRecord | undefined;
    if (this.currencyTable.length) {
      value = this.currencyTable.find((el) => el.denominator === response[3]);
      if (!value) {
        throw new RangeError("[ID003] Invalid denominator value");
      }
    } else {
      value = {
        value: NaN,
        denominator: response[3],
        currency: NaN
      };
    }
    return value;
  }

  private reject(): Promise<Array<number>> {
    return this.send(CODES_OF_TRANSMITTER.OPERATION_COMMAND.RETURN);
  }

  private async accept(): Promise<Array<number>> {
    let response: Array<number> = await this.send(CODES_OF_TRANSMITTER.OPERATION_COMMAND.STACK_1);
    // if (response[2] !== RESIVER_RESPONSES.RESPONSE_TO_OPERATION_COMMAND.ACK) {
    //   console.warn(response);
    //   throw new Error(
    //     RESIVER_RESPONSES.RESPONSE_TO_OPERATION_COMMAND.INVALID_COMMAND ===
    //     response[2]
    //       ? "Unknown command for acceptor!"
    //       : "Unknown answer from acceptor!"
    //   );
    // }
    return await this.send(CODES_OF_TRANSMITTER.STATUS_REQUEST);
  }

  private async getCurrencyTable() {
    const response: Array<number> = await this.send(CODES_OF_TRANSMITTER.SETTING_STATUS_REQUEST.CURRENCY_ASSIGN_REQUEST);
    if (response[2] !== RESIVER_RESPONSES.RESPONSE_TO_SETTING_COMMAND.DENOMINATION_DATA) {
      log.warning("Device does not support currency table!");
      return;
    }
    this.currencyTable.push(...parseCurrencyTable(response));
    log.info("Currency table: ", this.currencyTable);
  }

  private setLastStatus(code: number) {
    for (const [key, map] of Object.entries(CODES_OF_RESSIVER)) {
      if (map.has(code)) {
        this.lastStatus = map.get(code) || "";
        this.ok = !(key === "ERROR_STATUS");
        return;
      }
    }
  }
}
