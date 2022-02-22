import { BaseDispenser, IDispenseAnswer, IDispenserStatus } from "../../model/IDispenser";
import { ISerialPort } from "../../serial/types";
import { IStatus } from "../../model/IStatus";
import { COMMAND_CODES, STANDARD_BYTES, STATUS_CODES, PORT_SETTINGS } from "./constants";
import { formatMessage, isValidResponse, parseDispense, parseStatus } from "./helpers";
import { Logger } from "../../../helpers/logger";
import { synchronized } from "d4c-queue";

const log = new Logger("[MINIMECH]");

export default class MINIMECH extends BaseDispenser {

  private isEmpty: boolean = false;

  public constructor(port: ISerialPort) {
    super(port);
    this.deviceType = "[MINIMECH] ";
    this.numberOfCassettes = 1;
  }

  public async checkStatus(): Promise<IStatus> {
    let response: Array<number>;
    try {
      response = await this.sendMessage(COMMAND_CODES.STATUS, 10000);
    } catch (error) {
      throw new Error("Error while getting status of dispenser");
    }

    const status = parseStatus(response);
    const ok: boolean = !(status.FEED_SENSOR_BLOCKED || status.EXIT_SENSOR_BLOCKED || status.TIMING_WHEEL_SENSOR_BLOCKED);
    return {
      ok,
      enabled: this.enable,
      status: this.lastStatus,
      connected: true,
      rawResponse: response,
    };

  }

  public async dispense(count: number, cassetteNumber: number): Promise<IDispenseAnswer> {
    if (cassetteNumber > this.numberOfCassettes) {
      throw new Error("Invalid number of cassette");
    }
    let response: { status: string, dispensed: number, rejected: number, raw: Array<number> };
    try {
      response = await this.billDispense(count);
    } catch(error) {
      log.debugError("Error occupy while dispensing:", error);
      throw error;
    }

    log.debug("Response of dispensing: ", response);

    return parseDispense(response.raw);
  }

  private async billDispense (count: number): Promise<{ status: string, dispensed: number, rejected: number, raw: Array<number> }> {
    let response: Array<number>;
    try {
      await this.purge();
      response = await this.sendMessage(COMMAND_CODES.DISPENSE, 120000, [count + 0x20]);
    } catch {
      throw new Error("Error occupy while getting response on dispensing!");
    }
    const status: string = STATUS_CODES.get(response[4]) || "";
    this.isEmpty = status === "Feed Failure";
    const dispensed: number = response[5] - 0x20;
    const rejected: number = response[6] - 0x20;
    return { status, dispensed, rejected, raw: response };
  }

  getDispenserStatus(): IDispenserStatus {
    return {
      status: this.lastStatus,
      type: this.deviceType,
      cassettes: new Map([
        [1, { isExist: true, isEmpty: this.isEmpty }]
      ]),
      ok: this.lastStatus === "Good Operation"
    };
  }

  public async init(): Promise<boolean> {
    try {
      log.debug("Try to init MINIMECH")
      await this.port?.open(PORT_SETTINGS);
      log.debug("Port open")
      const status = await this.checkStatus();
      if (!status.ok) {
        try {
          await this.port?.close()
        } catch {
          log.debugError("Error while closing port. Device not respond");
        }
        return false;
      }
      let response: Array<number> = await this.sendMessage(COMMAND_CODES.PURGE, 120000);
      log.debug("Response on purge: ", response);
      this.lastStatus = STATUS_CODES.get(response[4]) || "";
      this.initLoop(800);
      return true;
    } catch (error) {
      try {
        await this.port?.close()
      } catch(error) {
        log.debugError("Error while closing port: ", error);
      }
      log.debugError("Error occupy while try to initialize MINIMECH dispenser:\n", error);
      return false;
    }
  }

  protected loop(): void {
  }

  public async multiDispense(dispenseData: Array<{ count: number; cassetteNumber: number }>): Promise<IDispenseAnswer> {
    if ((dispenseData.length > 1) || (dispenseData[0].cassetteNumber !== 1)) {
      throw new Error("Invalid cassette number");
    }
    let response: {dispensed: number, rejected: number, raw: Array<number>};
    try {
      response = await this.billDispense(dispenseData[0].count);
    } catch(error) {
      log.debugError("Error while dispensing: ", error);
      throw error;
    }
    log.debug("Response of dispensing: ", response);
    return parseDispense(response.raw);
  }

  public async purge(): Promise<IStatus> {
    let response: Array<number>;
    try {
      response = await this.sendMessage(COMMAND_CODES.PURGE, 120000);
    } catch(error: any) {
      log.debugError("Error occupy while purging!\n", error);
      throw new Error("Error while purging: " + error.message);
    }
    this.lastStatus = STATUS_CODES.get(response[4]) || "";
    return {
      ok: !(response[4] - 0x20),
      enabled: this.enable,
      status: this.lastStatus,
      connected: true,
      rawResponse: response,
    };
  }

  public async romVersion(): Promise<IStatus> {
    let response: Array<number>;
    try {
      response = await this.sendMessage(COMMAND_CODES.CONFIGURATIONS_STATUS);
    } catch(error: any) {
      log.debugError("Error while getting ROM version:\n", error);
      throw new Error("Error while getting ROM Version:\n" + error.message);
    }
    const data0: number = response[4];
    const data1: number = response[5];
    const ROM_Version: string = `2011-${data0 - 0x20}.${data1 - 0x20}`;
    return {
      ok: true,
      enabled: this.enable,
      connected: true,
      status: ROM_Version,
      rawResponse: response
    };
  }

  testDispense(): Promise<IStatus> {
    return Promise.resolve({
      connected: true,
      enabled: this.enable,
      ok: true,
      rawResponse: [],
      status: "Test Dispense"
    });
  }

  private reset() {
    return this.port?.write(formatMessage(COMMAND_CODES.RESET));
  }

  @synchronized
  private async sendMessage(command: COMMAND_CODES, timeout: number = 500, data: Array<number> = []): Promise<Array<number>> {
    const message: Array<number> = formatMessage(command, data);
    log.debug("Message to send: ", message);
    let response: Array<number>;
    try {
      log.debug("Getting response")
      response  = await this.port?.writeAndRead(message, timeout) || [];
      log.debug("Response: ", response)
    } catch {
      throw new Error("Error while waiting first part of response!");
    }
    while (true) {
      const indexOfStart: number = response.indexOf(STANDARD_BYTES.START_OF_HEADER);
      response = response.slice(indexOfStart);
      if (!isValidResponse(response)) {
        try {
          const bytes = await this.port?.redBytes() || [];
          response.push(...bytes);
        } catch {
          throw new Error("Error while getting rest of response!");
        }
        continue;
      }
      return response;
    }
  }

}