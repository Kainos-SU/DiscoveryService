import { IStatus } from "./IStatus";
import { ISerialPort } from "../serial/types";
import BaseDevice from "./BaseDevice";

export interface IDispenserOnError {
  purge: () => void;
  status: string;
}

export interface IDispenserStatus {
  ok: boolean;
  status: string;
  cassettes: Map<number, ICassetteStatus>;
  type: string;
}

export interface IDispenseAnswer {
  ok: boolean;
  crc: boolean;
  errorCode: number;
  errorText: string;
  cassettes: Array<{
    cassetteNumber: number;
    requestedBillCHK: number;
    requestedBillEXIT: number;
    rejectedBill: number;
    cassetteStatus: string;
  }>;
}

export interface IDispenserActions {}

export interface IDispenser {}

export interface ICassetteStatus {
  isExist: boolean;
  isEmpty: boolean;
}

export abstract class BaseDispenser extends BaseDevice implements IDispenser {
  protected numberOfCassettes: number = 0;

  protected cassettesStatus: Map<number, ICassetteStatus> = new Map();

  protected events: Map<string, Array<(opt: IDispenserOnError | IDispenserActions) => void>> = new Map([
    ["error", []]
  ]);

  protected constructor(port: ISerialPort) {
    super();
    this.port = port;
  }

  abstract dispense(count: number, cassetteNumber: number): Promise<IDispenseAnswer>;

  abstract multiDispense(dispenseData: Array<{count: number, cassetteNumber: number}>): Promise<IDispenseAnswer>;

  abstract purge(): Promise<IStatus>;

  abstract testDispense(): Promise<IStatus>;

  abstract romVersion(): Promise<IStatus>;

  abstract init(): Promise<boolean>;

  abstract getDispenserStatus(): IDispenserStatus;

  public getCassetteNumber(): number {
    return this.numberOfCassettes
  }

  public isMyPort(port: ISerialPort): boolean {
    return this.port?.port === port.port;
  }

  abstract checkStatus(): Promise<IStatus>;
}
