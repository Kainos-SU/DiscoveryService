import { IStatus } from "./IStatus";
import {ISerialPort} from "../serial/types";
import BaseDevice from "./BaseDevice";

export interface IAcceptorActions {
  denominator: number,
  currency?: string,
  value?: number;
  accept?(): void;
  reject?(): void;
}

export interface IAcceptorStatus {
  ok: boolean;
  status: string;
  isFull: boolean;
  type: string;
}

export interface IAcceptorOnRejectActions {
    reason: string;
    codeOfReject?: number;
}

export interface IAcceptorOnErrorActions {
  error: string;
  description: string;
  reset:()=>void;
}

export interface IAcceptor {}

export abstract class BaseAcceptor extends BaseDevice implements IAcceptor {
  protected events: Map<string, Array<(act: IAcceptorActions | IAcceptorOnErrorActions | IAcceptorOnRejectActions) => void>> =
    new Map([
      ["billIn", []],
      ["billStacked", []],
      ["onError", []],
      ["returned", []],
      ["rejected", []]
    ]);

  protected isFull: boolean = false;
  protected connected: boolean = false;

  protected constructor(port: ISerialPort) {
    super();
    this.port = port;
  }

  abstract init(): Promise<boolean>;

  abstract getAcceptorStatus(): IAcceptorStatus
}

