import {IStatus} from "./IStatus";
import {ISerialPort} from "../serial/types";

export interface IDevice {
  isMyPort(port: ISerialPort): boolean;
  getPort(): ISerialPort | undefined;
  getType(): string;
  init(): Promise<boolean>;
  enabled(enabled: boolean): void;
  checkStatus(): Promise<IStatus>;
  on(event: string, handler: (prop: any) => any): void;
  off(event: string, handler: (prop: any) => any): void;
  removeAllEventListeners(): void;
  destroy(): Promise<void>;
}
