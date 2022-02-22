const { exec } = require("child_process");
const serialport = require("serialport");
const Buffer = require("buffer").Buffer;
import { ISerialPort, SerialPortOption } from "./types";
const { once } = require("events");
import { Logger } from "../../helpers/logger";

const log = new Logger("[NodeSerial]");

type NSerialPort = typeof serialport;

type PortInfo = {
  path: string;
  manufacturer: string;
  serialNumber: string;
  pnpId: string;
  locationId: string;
  productId: string;
  vendorId: string;
};

export default class NodeSerialPort implements ISerialPort {
  private _port: NSerialPort;
  private path: string;
  private isListening = false;
  private isReading = false;
  private readBuffer: Array<number> = [];
  private activeReject: any = null;
  private onData: Array<(error: any) => void> = [];
  private onReadable: Array<(error: any) => void> = [];
  private readBytesTimeoutIndex: any;

  private static portSettingsDefault: SerialPortOption = {
    baudRate: 9600,
    bufferSize: 250,
    parity: "none",
    stopBits: 1,
    dataBit: 8,
    flowControl: "none"
  };

  public constructor(path: string) {
    this.path = path;
  }

  public static async getPorts(): Promise<Array<NodeSerialPort>> {
    const portList: Array<PortInfo> = await serialport.list();
    let realPorts: Array<PortInfo> = [];
    if (process.platform === "linux") {
      const dmesgOutput = await new Promise<string>((resolve, reject) => {
        exec("dmesg | grep tty", (error: any, stdout: string, stderr: string) => {
          if (error) {
            reject(error);
          }
          resolve(stdout);
        });
      });
      const ports: Array<string> = Array.from(new Set(dmesgOutput.match(/(?<= )tty.{2,4}(?=[: \n])/g)));
      realPorts = portList.filter((port) => ports.some((p) => port.path.includes(p)));
    } else {
      realPorts = portList;
    }
    return realPorts.map((el) => new NodeSerialPort(el.path));
  }

  // public static async getPorts(): Promise<Array<NodeSerialPort>> {
  //   const portList: Array<PortInfo> = await serialport.list();
  //   return portList.map((el) => new NodeSerialPort(el.path));
  // }

  public get port(): string {
    return this.path;
  }

  public open(option: SerialPortOption = NodeSerialPort.portSettingsDefault): Promise<void> {
    const params: any = {};
    if (option.baudRate) {
      params["baudRate"] = option.baudRate;
    }
    if (option.parity) {
      params["parity"] = option.parity;
    }
    if (option.stopBits) {
      params["stopBits"] = option.stopBits;
    }
    if (option.dataBit) {
      params["dataBits"] = option.dataBit;
    }
    return new Promise((resolve, reject) => {
      // log.debug("Try opening port", this.port);
      this._port = new serialport(this.path, params, (error: Error) => {
        if (error) {
          // log.debugError("Error opening port", this.port, error);
          try {
            this._port.close((err: any) => {
              // log.debugError("Error while close", err);
            });
          } catch (err) {
            // log.error("[NodeSerial] Error while close", err);
          }
          return reject(error);
        }
        this._port.on("readable", this.onReadableEvent.bind(this));
        this._port.on("data", this.onReadFinishEvent.bind(this));
        // this._port.on("error", () => {
        //   console.log("on stream [error]")
        //   if (this.activeReject) {
        //     this.activeReject()
        //   }
        //   this.activeReject = null
        // })
        this._port.on("close", () => {
          console.log("on stream [close]");
          if (this.activeReject) {
            this.activeReject();
          }
          this.activeReject = null;
        });
        this._port.on("finish", () => console.log("ON FINISH"));
        return resolve();
      });
    });
  }

  public close(): Promise<void> {
    // log.debug("[NodeSerial] closing port", this.port);
    return new Promise((resolve, reject) => {
      if (!this._port) {
        // log.debug("[NodeSerial] Port not found", this.port, this._port)
        return resolve();
      }

      // log.debug("Start closing port!", this._port);
      this.activeReject = null;
      try {
        this._port?.removeAllListeners();
        this._port?.close((error: Error) => {
          if (error) {
            // log.debug("[NodeSerial] Error while closing port", this.port, error);
            return reject(error);
          }
          return resolve();
        });
      } catch (err) {
        // log.debug("[NodeSerial] Error while closing port:", this.port);
      }
    });
  }

  /** Реализация чтения с порта в режиме паузи */
  private pausePort(): void {
    let temp: Array<(error: any) => void> = this._port.rawListeners("data");
    if (temp.length) {
      this.onData = temp;
      this._port.removeAllListeners("data");
    }
    temp = this._port.rawListeners("readable");
    if (temp.length) {
      this.onReadable = temp;
      this._port.removeAllListeners("readable");
    }
    this._port.pause();
  }

  private resumePort(): void {
    this._port.flush((error: any) => {
      // log.debug(`[NodeSerial] flush error on port ${this.path}:`, error);
    });
    if (this._port.rawListeners("data").length && this.onData.length) {
      this._port.removeAllListeners("data");
      this.onData.forEach((handler) => this._port.on("data", handler));
      this.onData = [];
    }
    if (this._port.rawListeners("readable").length && this.onReadable.length) {
      this._port.removeAllListeners("readable");
      this.onReadable.forEach((handler) => this._port.on("readable", handler));
      this.onReadable = [];
    }
    this._port.resume();
  }

  public writeAndRead(message: Array<number>, readTimeout: number = 300, read: boolean = true): Promise<Array<number>> {
    this._port.flush();
    this.pausePort();
    return new Promise<Array<number>>((resolve, reject) => {
      /** Стоп кран по времени */
      this.readBytesTimeoutIndex = setTimeout(() => {
        log.debug("!!!!!TIMEOUT!!!!!!");
        reject(new Error("[NodeSerial] Timeout of writeAndRead!"));
        this._port.removeAllListeners("readable");
        this.resumePort();
      }, readTimeout);

      const _read = () => {
        clearTimeout(this.readBytesTimeoutIndex);
        const temp: Buffer | null = this._port.read();
        if (temp === null) {
          return reject("[NodeSerial] Error of writeAndRead - emptyAnswer!");
        }
        return resolve(Array.from(temp));
      };

      /** Проверка данных в сообщении */
      if (message.some((num) => num > 255 || num < 0)) {
        return reject(new Error(`[NodeSerial] Wrong data in message. There is values or greater then 255 or smaller then 0: [${message.join(", ")}]`));
      }

      const tempMessage: Buffer = Buffer.from(message);
      this._port.write(tempMessage, (error: any) => {
        if (error) {
          return reject(error);
        }
        this._port.once("readable", _read);
      });
      if (!read) {
        return resolve([]);
      }
    });
  }

  public redBytes(timeout: number = 600): Promise<Array<number>> {
    this.pausePort();
    return new Promise((resolve, reject) => {
      /** Стоп кран по времени */
      this.readBytesTimeoutIndex = setTimeout(() => {
        reject(new Error("[NodeSerial] Timeout of readBytes!"));
        this._port.removeAllListeners("readable");
        this.resumePort();
      }, timeout);

      const _read = () => {
        clearTimeout(this.readBytesTimeoutIndex);
        const temp: Buffer | null = this._port.read();
        if (temp === null) {
          return reject(new Error("[NodeSerial] Error while reading by readBytes. Empty response!"));
        }
        resolve(Array.from(temp));
      };

      this._port.once("readable", _read);
    });
  }

  public read(timeout: number = 300): Promise<Array<number>> {
    if (this.isListening || this.isReading) {
      return Promise.reject(new Error("[NodeSerialPort] Can not read, port is busy! Someone is listening port!"));
    }
    this.readBuffer = [];
    this.isReading = true;
    return new Promise((resolve, reject) => {
      this.activeReject = reject;
      const cleanAndExit = () => {
        this.activeReject = null;
        if (this.readBuffer.length && !this.isReading) {
          const buffer = this.readBuffer;
          this.readBuffer = [];
          resolve(buffer);
        } else {
          reject();
        }
      };

      if (this.isReading || !this.readBuffer.length) {
        setTimeout(cleanAndExit, timeout);
      } else {
        cleanAndExit();
      }
    });
  }

  public write(message: Array<number>): Promise<void> {
    if (message.some((el: number) => el > 255 || el < 0)) {
      return Promise.reject(new Error("Invalid value in message." + message.join(", ")));
    }

    return new Promise((resolve, reject) => {
      this.activeReject = reject;
      let canWrite = false;
      const tempBuffer = Buffer.from(message);
      try {
        canWrite = this._port.write(tempBuffer, (error: Error) => {
          this.activeReject = null;
          if (error) {
            log.debug("[NodeSerial] Error while writing!", error);
            return reject(error);
          }
          return resolve();
        });
      } catch (e) {
        this._port.flush();
        this._port.drain();
        this.activeReject = null;
        reject();
      }
      if (!canWrite) {
        this._port.once("drain", (event: any) => {
          this.activeReject = null;
          resolve();
        });
      }
    });
  }

  public writeString(message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // console.log("[Node Serial]" + this.port + " start writing!")
      this.activeReject = reject;
      let canWrite = false;
      try {
        canWrite = this._port.write(message, "utf8", (error: Error) => {
          this.activeReject = null;
          if (error) {
            console.error(error);
            return reject(error);
          }
          return resolve();
        });
      } catch (e) {
        console.error(e);
        this._port.flush();
        this._port.drain();
        this.activeReject = null;
        reject();
      }
      // console.log("[Node Serial]" + this.port + " is drained: ", canWrite);
      if (!canWrite) {
        once(this._port, "drain").then((event: any) => {
          this.activeReject = null;
          // console.log("[Node Serial]" + this.port + " drain event fired ",event)
          resolve();
        });
      }
    });
  }

  private onReadableEvent() {
    // console.log("on onReadableEvent")
    if (this.readBuffer.length > 255) {
      this.readBuffer = this.readBuffer.slice(this.readBuffer.length - 255);
    }
    this.isReading = true;
    const value = this._port.read();
    this.readBuffer.push(...(value as Array<number>));
    // console.log(`[NodeSerial] ${this.path} readBuffer`,this.readBuffer)
  }

  private onReadFinishEvent() {
    // console.log("on onReadFinishEvent")
    this.isReading = false;
  }
}
