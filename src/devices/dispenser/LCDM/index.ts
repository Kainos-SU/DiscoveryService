import { IStatus } from "../../model/IStatus";
import { BaseDispenser, IDispenseAnswer, IDispenserStatus } from "../../model/IDispenser";
import { ISerialPort, SerialPortOption } from "../../serial/types";
import {
  CODES_OF_COMMANDS,
  COMMAND_CODES,
  STANDART_BYTES,
  ERROR_CODES,
  SENSOR_STATUS,
  CODES_OF_ERRORS
} from "./constants";
import { calculateCRC, handleLDCMAnswer, parseDispense, parseStatus } from "./helpers";
import { ILCDMPortAnswer, ILCDMStatus } from "./types";
import { synchronized } from "d4c-queue";
import { Logger } from "../../../helpers/logger";

const log = new Logger("[LCDM]");

const portSettings: SerialPortOption = {
  baudRate: 9600, // or 38400 depends on dip switches
  bufferSize: 255,
  dataBit: 8,
  flowControl: "none",
  parity: "none",
  stopBits: 1
};

export default class LCDM extends BaseDispenser {
  private errorStatus: string = "";

  public constructor(port: ISerialPort) {
    super(port);
    this.deviceType = "LCDM";
  }

  public async init(): Promise<boolean> {
    let evenTry = false;
    while (true){
      try {
        await this.port?.open(portSettings);
        const answer = await this.sendNew(COMMAND_CODES.STATUS, undefined, 10000);
        if (!answer.ack && !answer.crc) {
          await this.port?.close();
          return false;
        }
        await this.checkDeviceType();
        await this.purge();
        break;
      } catch (error) {
        try {
          await this.port?.close();
        } catch(error: any) {
          log.debugError("Error on closing port: ", error)
        }
        if (!evenTry) {
          evenTry = true;
          portSettings.parity = "even";
          continue;
        }
        log.debugError(`port: ${this.port?.port}! Error while initialize: `, error);
        return false;
      }
    }
    this.initLoop(15000);
    return true;
  }

  private async checkDeviceType(): Promise<void> {
    let answer: IStatus;
    try {
      answer = await this.romVersion();
      const version = answer.rawResponse
        .slice(4, 8)
        .map((el) => String.fromCharCode(el))
        .join("");
      log.debug(`Cheching device type:`, version);
      if (version[0] === "O" && version[3] === "T") {
        this.deviceType = "LCDM-1000";
        this.numberOfCassettes = 1;
        this.cassettesStatus.set(1, {
          isExist: true,
          isEmpty: true,
        });
        return;
      }
      if (version[0] === "T" && version[0] === version[3]) {
        this.deviceType = "LCDM-2000";
        this.numberOfCassettes = 2;
        this.cassettesStatus.set(1, {
          isExist: true,
          isEmpty: true,
        });
        this.cassettesStatus.set(2, {
          isExist: true,
          isEmpty: true,
        });
        return;
      }
    } catch (error) {
      log.debugError("Error getting type of dispenser", error);
    }
    this.deviceType = "LCDM";
    return;
  }

  protected async loop() {
    let response: ILCDMPortAnswer;
    try {
      response = await this.sendNew(COMMAND_CODES.STATUS, undefined, 15000);
    } catch (err) {
      log.debugError("Error in main loop", err);
      return Promise.reject(err);
    }

    const status = parseStatus(response.data, this.deviceType);
    this.lastStatus = status.errorStatus;
    this.setCassettesStatus(status);
    let error: boolean = false;
    this.errorStatus = "";
    if (!status.ok) {
      this.errorStatus = `[LCDM] ErrorCode: ${status.errorCode.toString(16)}H, Error: ${status.errorStatus}`;
      error = true;
    }
    if (Object.entries(status.sensor0Status).some(([_, value]) => value)) {
      this.errorStatus +=
        "\n[LCDM] Sensor0 Error:\n" +
        Object.entries(status.sensor0Status)
          .filter(([_, value]) => value)
          .map(([key, _]) => key.replaceAll("_", " ") + ": Error")
          .join("\n");
      error = true;
    }
    if (Object.entries(status.sensor1Status).some(([_, value]) => value)) {
      this.errorStatus +=
        "\n[LCDM] Sensor1 Error:\n" +
        Object.entries(status.sensor1Status)
          .filter(([_, value]) => value)
          .map(([key, _]) => key.replaceAll("_", " ") + ": Error")
          .join("\n");
      error = true;
    }
    if (!status.ok) {
      this.fireEvent("error");
    }

    if (!this.deviceType || this.deviceType === "LCDM") {
      await this.checkDeviceType();
    }
    // log.debug("[LCDM] CheckStatus in loop", this.deviceType, "Getted status: ", status);
  }

  private fireEvent(event: string): void {
    const handlerList = this.events.get(event);
    if (handlerList === undefined) {
      throw new Error("No such event in list of events");
    }
    for (const handler of handlerList) {
      switch (event) {
        case "error":
          handler({
            status: this.errorStatus,
            purge: () => this.purge()
          });
          break;
      }
    }
  }

  public async purge(): Promise<IStatus> {
    let response: ILCDMPortAnswer;
    try {
      // log.debug("[LCDM] PURGING");
      response = await this.sendNew(COMMAND_CODES.PURGE, undefined, 20000);
    } catch (err) {
      return Promise.reject<IStatus>(err);
    }
    const ok = this.errorCheck(response.data[4]);
    const status = `${ok ? "Successful" : "Try to"} purge. Current error status: ${ERROR_CODES.get(response.data[4])}`;
    return {
      ok,
      enabled: this.enable,
      connected: true,
      status,
      rawResponse: response.data
    };
  }

  public async romVersion(): Promise<IStatus> {
    let response: ILCDMPortAnswer;
    try {
      // log.debug("[LDCM] ROM VERSION");
      response = await this.sendNew(COMMAND_CODES.ROM_VERSION, undefined, 30000);
    } catch (err) {
      return Promise.reject(err);
    }
    let status = "ROM Version: ";
    const data: Array<number> = response.data;
    for (const char of data.slice(4, data.length - 2)) {
      status += String.fromCharCode(char);
    }

    return {
      ok: response.ack,
      enabled: this.enable,
      connected: true,
      status,
      rawResponse: response.data
    };
  }

  public async checkStatus(): Promise<IStatus> {
    try {
      log.debug("[LCDM] CHECK STATUS");
      const resp = await this.sendNew(COMMAND_CODES.STATUS, undefined, 30000);
      if (!resp.data.length) {
        return Promise.reject(new Error("[LCDM] Device not response. Probably disconnected!"));
      }
      const status = parseStatus(resp.data, this.deviceType);
      this.lastStatus = status.errorStatus;
      this.setCassettesStatus(status);
      return {
        ok: this.errorCheck(resp.data[5]),
        enabled: this.enable,
        connected: true,
        status: "OK",
        rawResponse: resp.data
      };
    } catch (error) {
      log.debug(`port: ${this.port?.port} No response!`);
      return Promise.reject(new Error("No response"));
    }
  }

  /**
   * Отправка команды в диспенсер
   * @param cmd команда
   * @param data дополнительные байты пакета
   * @param timeout через которое прекращается чтение
   * @private
   */
  @synchronized
  private async sendNew(cmd: number, data: Array<number> | undefined = undefined, timeout: number = 15000): Promise<ILCDMPortAnswer> {
    if (!this.port) return Promise.reject(new Error("[LCDM]: Port is not exists!"));
    if (!CODES_OF_COMMANDS.has(cmd)) return Promise.reject(new RangeError("[LCDM]: Invalid command!"));

    const request: Array<number> = [STANDART_BYTES.EOT, STANDART_BYTES.ID, STANDART_BYTES.STX, cmd];
    if (data) {
      request.push(...data);
    }
    request.push(STANDART_BYTES.EXT);
    request.push(calculateCRC(request));
    const buffer: Array<number> = [];
    try {
      const bytes = await this.port?.writeAndRead(request, timeout, true) || [];
      buffer.push(...bytes);
      // log.debug(`port: ${this.port?.port}. Primary response in method send: `, buffer);
    } catch (err) {
      log.error(`Error on port ${this.port?.port}`, err);
      return Promise.reject(err);
    }
    let prevIndexSOH = 0;
    while (true) {
      const indexSOH = buffer.indexOf(STANDART_BYTES.SOH, prevIndexSOH);
      const indexEXT = buffer.indexOf(STANDART_BYTES.EXT, indexSOH === -1 ? prevIndexSOH : indexSOH);
      prevIndexSOH = indexSOH === -1 ? prevIndexSOH : indexSOH;
      const checkSOH = indexSOH !== -1 && STANDART_BYTES.ID === buffer[indexSOH + 1];
      const checkEXT = indexEXT > -1 && indexEXT <= buffer.length - 2;
      if (checkSOH && checkEXT) {
        break;
      }
      if ((indexEXT === -1 || indexSOH === -1) && indexEXT !== indexSOH && buffer.length > 200) {
        prevIndexSOH = 0;
        buffer.splice(0, buffer.length);
        try {
          const bytes = await this.port?.writeAndRead([STANDART_BYTES.NCK], timeout) || [];
          buffer.push(...bytes);
        } catch (error) {
          log.error(`Port: ${this.port?.port}! Error on reading data by writeAndRead after message lost`, error);
          return Promise.reject(error);
        }
        continue;
      }
      try {
        const bytes = await this.port?.redBytes(timeout) || [];
        buffer.push(...bytes);
      } catch (err) {
        // log.error(`Port: ${this.port?.port}! Error on reading data by readBytes`, err);
        return Promise.reject(err);
      }
      // log.debug("New Response", buffer);
    }
    // log.debug("End version of response: ", buffer);
    const resp = handleLDCMAnswer(buffer);

    if (resp.ack || resp.crc) {
      await this.port.write([STANDART_BYTES.ACK]);
    }
    return resp;
  }

  private errorCheck(code: number): boolean {
    const status: String = ERROR_CODES.get(code) || "";
    if (status !== "Good" && status !== "Normal Stop") {
      return false;
    } else {
      return true;
    }
  }

  private setCassettesStatus (status: ILCDMStatus) {
    for (const [cassetteNumber, cassetteStatus] of this.cassettesStatus) {
      if (cassetteNumber === 1) {
        cassetteStatus.isExist = !status.sensor1Status.CASSETTE0_SENSOR;
        if (status.sensor0Status.CASSETTE0_SENSOR) {
          cassetteStatus.isEmpty = false;
        }
      } else if ("CASSETTE1_SENSOR" in status.sensor1Status) {
        cassetteStatus.isExist = !status.sensor1Status.CASSETTE0_SENSOR;
        if (status.sensor1Status.CASSETTE1_SENSOR) {
          cassetteStatus.isEmpty = false;
        }
      }
      this.cassettesStatus.set(cassetteNumber, cassetteStatus);
    }
  }

  private formatDispenseMessage(count: number): Array<number> {
    if (count >= 100) {
      throw new RangeError("Value to dispense is to big!");
    }
    return count
      .toString(10)
      .padStart(2, "0")
      .split("")
      .map((el) => el.charCodeAt(0));
  }

  public async testDispense(upper: boolean = true): Promise<IStatus> {
    let response: ILCDMPortAnswer;
    try {
      response = await this.sendNew(upper ? COMMAND_CODES.UPPER_TEST_DISPENSE : COMMAND_CODES.LOWER_TEST_DISPENSE, undefined, 60000);
    } catch (err) {
      return Promise.reject(err);
    }
    const parsedResponse = parseDispense(response.data);

    const status: string = `Test dispense. Error status: ${parsedResponse.errorText}\nDispensed: ${parsedResponse.cassettes[0].requestedBillCHK}\nRejected: ${parsedResponse.cassettes[0].rejectedBill}`;
    return {
      ok: this.errorCheck(parsedResponse.errorCode),
      enabled: this.enable,
      connected: true,
      status,
      rawResponse: response.data
    };
  }

  public async dispense(count: number, cassetteNumber: number = 1): Promise<IDispenseAnswer> {
    let commandCode: number;

    switch (cassetteNumber) {
      case 1:
        commandCode = COMMAND_CODES.UPPER_DISPENSE;
        break;
      case 2:
        commandCode = COMMAND_CODES.LOWER_DISPENSE;
        break;
      default:
        return Promise.reject("Unknown cassette number");
    }

    let answer: ILCDMPortAnswer;
    try {
      await this.purge();
      answer = await this.sendNew(commandCode, this.formatDispenseMessage(count), 65000);
    } catch (error) {
      log.error("Error while getting response from dispenser");
      return Promise.reject(error);
    }
    log.debug("Answer on dispense: ", answer);
    const dispensed = parseDispense(answer.data);
    this.lastStatus = dispensed.errorText;
    dispensed.cassettes.forEach((cassette) => {
      const isExist = this.cassettesStatus.get(cassette.cassetteNumber)?.isExist || false;
      let isEmpty: boolean = false;
      if (count > cassette.requestedBillEXIT) {
        isEmpty = true
      }
      this.cassettesStatus.set(cassette.cassetteNumber, {
        isExist,
        isEmpty
      });
    });
    return dispensed;
  }

  public async multiDispense(dispenseData: Array<{ count: number; cassetteNumber: number }>): Promise<IDispenseAnswer> {
    if (dispenseData.some(({ cassetteNumber }) => cassetteNumber > this.numberOfCassettes)) {
      return Promise.reject(
        `[LCDM] This dispenser can dispenser can dispense only from ${this.numberOfCassettes} number of cassettes! Invalid input number of cassettes`
      );
    }
    if (dispenseData.length === 1) {
      const { count, cassetteNumber } = dispenseData[0];
      return await this.dispense(count, cassetteNumber);
    }
    const firstDispense: Array<number> = this.formatDispenseMessage(dispenseData.find(({ cassetteNumber }) => cassetteNumber === 1)?.count || 0);
    const secondDispense: Array<number> = this.formatDispenseMessage(dispenseData.find(({ cassetteNumber }) => cassetteNumber === 2)?.count || 0);
    const dataToDispense: Array<number> = firstDispense.concat(secondDispense);

    let answer: ILCDMPortAnswer;

    try {
      await this.purge();
      answer = await this.sendNew(COMMAND_CODES.UPPER_AND_LOWER_DISPENSE, dataToDispense, 60000);
    } catch (error: any) {
      return Promise.reject("[LCDM] Error while getting response on multiDispense: " + error.message);
    }

    const dispensed = parseDispense(answer.data);
    this.lastStatus = dispensed.errorText;
    dispensed.cassettes.forEach((cassette) => {
      const requestDispense = dispenseData.find(({cassetteNumber}) => cassetteNumber === cassette.cassetteNumber);
      if (!requestDispense) {
        return;
      }
      const isExist = this.cassettesStatus.get(cassette.cassetteNumber)?.isExist || false;
      let isEmpty: boolean = false;
      if (requestDispense.count > cassette.requestedBillEXIT) {
        isEmpty = true
      }
      this.cassettesStatus.set(cassette.cassetteNumber, {
        isExist,
        isEmpty
      });
    });
    return dispensed;
  }

  getDispenserStatus(): IDispenserStatus {
    return {
      type: this.deviceType,
      status: this.lastStatus,
      ok: this.lastStatus === "Good" || this.lastStatus === "Normal Stop",
      cassettes: this.cassettesStatus
    }
  }
}
