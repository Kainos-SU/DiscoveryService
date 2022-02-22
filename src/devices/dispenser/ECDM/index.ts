import { Logger } from "../../../helpers/logger";
import { ISerialPort, SerialPortOption } from "../../serial/types";
import { BaseDispenser, ICassetteStatus, IDispenseAnswer, IDispenserStatus } from "../../model/IDispenser";
import { IStatus } from "../../model/IStatus";
import { STANDART_BYTES, COMMAND_CODES, COEFFICIENT_OF_VALUES, ERROR_CODES } from "./constants";
import { calculateXorCrc, decodeValue, checkXorCrc, parseStatus, filterResponse, prepareDataForDispense, parseDispenseData } from "./helpers";
import { IECDMPortAnswer, IECDMPurgeResponse, IECDMStatus, SensorStatus, IReject, IECDMSTATStatus } from "./types";
import { synchronized } from "d4c-queue";

const log = new Logger("[PULOON ECDM-200]: ");

const portSettings: SerialPortOption = {
  baudRate: 9600,
  bufferSize: 255,
  dataBit: 8,
  flowControl: "none",
  parity: "none",
  stopBits: 1
};

export default class ECDM extends BaseDispenser {
  public constructor(port: ISerialPort) {
    super(port);
    this.deviceType = "PULOON ECDM-200";
  }

  public async init(): Promise<boolean> {
    try {
      log.debug("Try to init device on port", this.port?.port);
      await this.port?.open(portSettings);
      const response = await this.reset();
      log.debug("Response from device: ", response);
      const status = await this.getECDMStatus();
      status.cassettes.forEach((cassette) => {
        if (cassette.inserted) {
          this.numberOfCassettes++;
          this.cassettesStatus.set(cassette.cassetteNumber, { isEmpty: false, isExist: !cassette.status.CASSETTE_EXIST.state });
        }
      });
      log.debug("Number of cassettes: ", this.numberOfCassettes);
      log.debug("Cassettes: ", this.cassettesStatus)
      this.initLoop(5000);
      return true;
    } catch (error) {
      log.error("Error while reseting dispenser!", error);
      await this.port?.close();
      return false;
    }
  }

  public async reset(): Promise<IECDMPortAnswer> {
    try {
      const response = await this.send(COMMAND_CODES.RESET, 4500);
      const indexSoh = response.indexOf(STANDART_BYTES.SOH);
      const indexExt = response.indexOf(STANDART_BYTES.EXT, indexSoh);
      const data: Array<number> = response.slice(indexSoh, indexExt + 2);
      const ack = response.includes(STANDART_BYTES.ACK);
      const crc = checkXorCrc(data);
      return {
        ack,
        error: 0x30 === data[4],
        crc,
        data
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async checkStatus(): Promise<IStatus> {
    try {
      const dispensersStatus = await this.getECDMStatus();
      let ok = true;
      let status = "";
      if (dispensersStatus.errorCode) {
        ok = false;
        status += "[ECDM] Error: " + dispensersStatus.error + "\n";
      }
      Object.values(dispensersStatus.DISP0 as { [p: string]: SensorStatus }).forEach((sensor) => {
        if (!sensor.state) {
          return;
        }
        ok = false;
        if (!status.includes("[ECDM] Sensor 0:\n")) {
          status += "[ECDM] Sensor 0:\n";
        }
        status += sensor.description + ": error\n";
      });
      Object.values(dispensersStatus.DISP1 as { [p: string]: SensorStatus }).forEach((sensor) => {
        if (!sensor.state) {
          return;
        }
        ok = false;
        if (!status.includes("[ECDM] Sensor 1:\n")) {
          status += "[ECDM] Sensor 1:\n";
        }
        status += sensor.description + ": error\n";
      });
      if (status.length) {
        status = "OK!";
      }
      const indexSoh = dispensersStatus.rawResponse.indexOf(STANDART_BYTES.SOH);
      const indexExt = dispensersStatus.rawResponse.indexOf(STANDART_BYTES.EXT, indexSoh);

      const rawResponse: Array<number> = dispensersStatus.rawResponse.slice(indexSoh, indexExt + 2);
      return {
        ok,
        enabled: this.enable,
        connected: true,
        status,
        rawResponse
      };
    } catch (error: any) {
      return Promise.reject(new Error("[ECDM] error getting response from dispenser: " + error.message));
    }
  }

  public async purge(): Promise<IStatus> {
    try {
      // debugger;
      const response = await this.purgeDispenser();
      let ok = true;
      let status = "Successful Purge!";
      if (response.errorCode) {
        status = "Purge with error status:\n" + response.error;
      }
      return {
        ok,
        enabled: this.enable,
        connected: true,
        status,
        rawResponse: response.rawResponse
      };
    } catch (error: any) {
      return Promise.reject(new Error("[ECDM] Error while purge! " + error.message));
    }
  }

  public romVersion(): Promise<IStatus> {
    return Promise.resolve({
      ok: false,
      enabled: this.enable,
      connected: true,
      status: "PULON ECDM-200 does not support this command!",
      rawResponse: []
    });
  }

  public dispense(count: number, cassetteNumber: number): Promise<IDispenseAnswer> {
    return this.multiDispense([{ count, cassetteNumber }]);
  }

  public async multiDispense(dispenseData: Array<{ count: number; cassetteNumber: number }>): Promise<IDispenseAnswer> {
    await this.purgeDispenser();
    const data = prepareDataForDispense(dispenseData.map(({ count, cassetteNumber }) => ({ count, cassette: cassetteNumber })));
    const response = await this.send(COMMAND_CODES.DISPENSE, 60000, data);
    log.debug(
      "Dispense response: ",
      response.map((el) => "0x" + el.toString(16))
    );
    const indexOfSoh = response.indexOf(STANDART_BYTES.SOH);
    const indexOfExt = response.indexOf(STANDART_BYTES.EXT);
    const dataToParse = response.slice(indexOfSoh, indexOfExt + 2);
    log.debug(
      "Dispense data to parse:",
      dataToParse.map((el) => "0x" + el.toString(16))
    );
    const dispenseResponse = parseDispenseData(dataToParse);

    if (!dispenseResponse.ok) {
      this.lastStatus = dispenseResponse.errorText
    }

    dispenseResponse.cassettes.forEach((cassette) => {
      const dataForCassette = dispenseData.find(({ cassetteNumber }) => cassetteNumber === cassette.cassetteNumber);
      if (!dataForCassette) {
        return;
      }
      const isExist = this.cassettesStatus.get(cassette.cassetteNumber)?.isExist || false;
      const isEmpty = dataForCassette.count > cassette.requestedBillEXIT;
      this.cassettesStatus.set(cassette.cassetteNumber, {
        isEmpty,
        isExist
      });
    })
    return dispenseResponse;
  }

  protected async loop() {
    const status = await this.getECDMStatus();
    log.debug("Pooling status of device:", status);
    let errors = status.error || "";
    Object.entries<SensorStatus>(status.DISP0).forEach(([_, value]) => {
      if (value.state) {
        errors += (errors.includes("DISP0") ? "" : "DISP0 Error:\n") + value.description + ": error\n";
      }
    });
    Object.entries<SensorStatus>(status.DISP1).forEach(([_, value]) => {
      if (value.state) {
        errors += (errors.includes("DISP1") ? "" : "DISP1 Error:\n") + value.description + ": error\n";
      }
    });
    status.cassettes.forEach((cassette, index) => {
      Object.entries(cassette.status).forEach(([key, value]) => {
        if (value.state) {
          errors += (errors.includes("Cassette" + index) ? "" : `Cassette${index}:\n`) + value.description + ": error\n";
        }
      });
    });
    if (errors) {
      this.fireEvent("error", errors);
    }
  }

  private fireEvent(event: string, ...params: any[]) {
    if (!this.events.has(event)) {
      return;
    }
    log.debug("Fired Event: ", event);
    for (const handler of this.events.get(event) || []) {
      switch (event) {
        case "error":
          handler({ purge: () => this.purge(), status: params[0] });
          break;
      }
    }
  }

  private async purgeDispenser(): Promise<IECDMPurgeResponse> {
    const rawResponse = filterResponse(await this.send(COMMAND_CODES.PURGE, 4000));
    const errorCode = decodeValue(rawResponse[rawResponse.indexOf(STANDART_BYTES.STX) + 2]);
    const error = errorCode ? ERROR_CODES.get(errorCode) : "";
    this.lastStatus = error || "OK";
    const indexOfCmd = rawResponse.indexOf(COMMAND_CODES.PURGE);
    const indexOfExt = rawResponse.indexOf(STANDART_BYTES.EXT, indexOfCmd);
    const data = rawResponse.slice(indexOfCmd + 3, indexOfExt);
    const rejectedData: Array<IReject> = [];
    for (let i = 0; i < data.length; i += 3) {
      rejectedData.push({
        cassetteNumber: i + 1,
        dispensed: decodeValue(data[i]),
        rejected: decodeValue(data[i + 1]),
        exist: data[i + 2] - 0x30 !== 0
      });
    }
    return {
      error,
      errorCode,
      rawResponse,
      rejectedData
    };
  }

  private async getECDMStatus(): Promise<IECDMStatus> {
    const response = await this.send(COMMAND_CODES.STATUS, 3000);
    const indexSoh = response.indexOf(STANDART_BYTES.SOH);
    const indexExt = response.indexOf(STANDART_BYTES.EXT, indexSoh);
    const data = response.slice(indexSoh, indexExt + 2);
    const status = parseStatus(data);
    this.lastStatus = status.errorCode ? status.error || "Unknown" : "OK";
    status.cassettes.forEach((cassette) => {
      if (cassette.cassetteNumber > this.numberOfCassettes) {
        return;
      }
      const isExist = !cassette.status.CASSETTE_EXIST.state;
      const isEmpty = isExist ? this.cassettesStatus.get(cassette.cassetteNumber)?.isEmpty || false : false;
      this.cassettesStatus.set(cassette.cassetteNumber, {
        isExist,
        isEmpty
      })
    });
    return status;
  }

  testDispense(): Promise<IStatus> {
    return Promise.resolve({
      ok: false,
      enabled: this.enable,
      connected: true,
      status: "Not implemented!",
      rawResponse: []
    });
  }

  private prepareMessage(cmd: number, data?: Array<number>) {
    if (!Object.values(COMMAND_CODES).includes(cmd)) {
      throw new Error("[ECDM] Error while formatting message. Unknown command! " + cmd);
    }
    const message: Array<number> = [STANDART_BYTES.EOT, STANDART_BYTES.ID, STANDART_BYTES.STX, cmd];
    if (data && data.length) {
      message.push(...data);
    }
    message.push(STANDART_BYTES.EXT);
    message.push(calculateXorCrc(message));
    return message;
  }

  @synchronized
  private async send(cmd: number, timeout: number = 1000, data?: Array<number>): Promise<Array<number>> {
    if (!this.port) {
      throw new Error("[ECDM] Serial port not found!")
    }
    const message = this.prepareMessage(cmd, data);
    log.debug("Message to send!", message);
    let response: Array<number> = [];
    try {
      response = await this.port.writeAndRead(message, timeout);
    } catch (error) {
      return Promise.reject(new Error("[ECDM] error on writeAndRead!"));
    }
    while (true) {
      if (response.includes(STANDART_BYTES.NCK) && !response.includes(cmd)) {
        return Promise.reject(new Error("[ECDM] Dispenser not recognize command! Response:" + response.map((num) => num.toString(16)).join(", ")));
      }
      const indexOfExt = response.lastIndexOf(STANDART_BYTES.EXT);
      if (indexOfExt < response.length && response.length > 7) {
        await this.port.write([STANDART_BYTES.ACK]);
        break;
      }
      response.push(...(await this.port.redBytes(timeout)));
    }
    return response;
  }

  public getDispenserStatus(): IDispenserStatus {
    return {
      type: this.deviceType,
      ok: this.lastStatus === "OK",
      status: this.lastStatus,
      cassettes: this.cassettesStatus
    };
  }
}
