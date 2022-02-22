import { IStatus } from "./model/IStatus";
import { IDevice } from "./model/IDevice";
import { ISerialPort } from "./serial/types";

export interface IDeviceWrapper {
  checkStatus(): Promise<IStatus>;
  on(event: string, handler: (obj: any) => any): void;
  off(event: string, handler: (obj: any) => any): void;
  getDevice(): IDevice | undefined;
  isEnabled(): boolean;
}

export class DeviceWrapper implements IDeviceWrapper {
  private enabled: boolean = false;
  private device?: IDevice;
  private eventsHandlers: Map<string, Array<(prop: any) => any>> = new Map();

  isEnabled(): boolean {
    return this.enabled;
  }

  public checkStatus(): Promise<IStatus> {
    if (!this.device) {
      return Promise.resolve({
        rawResponse: [] as Array< number>,
        status: "Disconnected",
        enabled: this.enabled,
        ok: false,
        connected: false,
      });
    }
    return this.device.checkStatus()
        .then((status: IStatus) => status)
        .catch((err: Error) => {
          console.warn("Error in get device wrapper:\n", err);
          return {
            ok: false,
            enabled: false,
            connected: false,
            status: "Device Lost!",
            rawResponse: []
          };
        });
  }

  public getPort(): ISerialPort | undefined {
    return this.device?.getPort()
  }

  public isMyPort(port: ISerialPort) {
    return this.device?.isMyPort(port);
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.device?.enabled(this.enabled)
  }

  public clearDevice(): void {
    this.device?.removeAllEventListeners();
    this.device?.destroy();
    this.device = undefined;
  }

  public set setDevice(device: IDevice) {
    this.clearDevice();
    this.device = device;
    for (const eventItem of this.eventsHandlers) {
      const event: string = eventItem[0];
      const handlers: Array<(obj: any) => any> = eventItem[1];
      for (const handler of handlers) {
        this.device.on(event, handler);
      }
    }
    this.device.enabled(this.enabled);
  }

  on(event: string, handler: (obj: any) => any) {
    if (this.eventsHandlers.has(event)) {
      this.eventsHandlers.get(event)?.push(handler);
    } else {
      this.eventsHandlers.set(event, [handler]);
    }
    this.device?.on(event, handler);
  }

  off(event: string, handler: (obj: any) => any) {
    if (!this.eventsHandlers.has(event)) {
      return;
    }
    this.device?.off(event, handler);
    const index: number | undefined = this.eventsHandlers
      .get(event)
      ?.indexOf(handler);
    if (!index || index < 0) {
      return;
    }
    this.eventsHandlers.get(event)?.splice(1, index);
  }

  public getDevice(): IDevice | undefined {
    return this.device;
  }
}
