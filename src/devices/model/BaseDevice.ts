import { IDevice } from "./IDevice";
import { IStatus } from "./IStatus";
import { ISerialPort } from "../serial/types";

export default abstract class BaseDevice implements IDevice {
  protected events: Map<string, Array<(act: any) => void>> = new Map();
  protected interval: any;
  protected deviceType: string = "";
  protected port?: ISerialPort;
  protected enable = true;
  protected lastStatus: string = "";

  public getType(): string {
    return this.deviceType;
  }

  public getPort(): ISerialPort | undefined {
    return this.port;
  }

  public async destroy(): Promise<void> {
    clearInterval(this.interval);
    this.removeAllEventListeners();
    if (!this.port) {
      return;
    }
    try {
      await this.port?.close();
      console.log("Port is closed");
    } catch (err) {
      console.warn(err);
    }
    this.port = undefined;
  }

  public isMyPort(port: ISerialPort): boolean {
    return this.port?.port === port.port;
  }

  public enabled(enabled: boolean): void {
    this.enable = enabled;
  }

  protected initLoop(period: number) {
    let isWork = false;
    this.interval = setInterval(async () => {
      if (isWork) return;
      try {
        isWork = true;
        await this.loop();
      } finally {
        isWork = false;
      }
    }, period);
  }

  abstract checkStatus(): Promise<IStatus>;

  abstract init(): Promise<boolean>;

  public off(event: string, handler: (prop: any) => any): void {
    if (!this.events.has(event)) {
      console.warn(`No event ${event} to delete handler`);
      return;
    }
    const index: number | undefined = this.events.get(event)?.indexOf(handler);
    if (index === undefined || index === -1) {
      console.warn("Handler not found!");
      return;
    }
    this.events.get(event)?.splice(index, 1);
  }

  public on(event: string, handler: (prop: any) => any): void {
    if (!this.events.has(event)) {
      console.warn("No event " + event);
      return;
    }
    this.events.get(event)?.push(handler);
  }

  public removeAllEventListeners(): void {
    for (const [_, handlers] of this.events) {
      handlers.splice(0, handlers.length);
    }
  }

  protected abstract loop(): void;
}
