import { IDevice } from "./IDevice";
import { IStatus } from "./IStatus";
import { ISerialPort } from "../serial/types";
export default abstract class BaseDevice implements IDevice {
    protected events: Map<string, Array<(act: any) => void>>;
    protected interval: any;
    protected deviceType: string;
    protected port?: ISerialPort;
    protected enable: boolean;
    protected lastStatus: string;
    getType(): string;
    getPort(): ISerialPort | undefined;
    destroy(): Promise<void>;
    isMyPort(port: ISerialPort): boolean;
    enabled(enabled: boolean): void;
    protected initLoop(period: number): void;
    abstract checkStatus(): Promise<IStatus>;
    abstract init(): Promise<boolean>;
    off(event: string, handler: (prop: any) => any): void;
    on(event: string, handler: (prop: any) => any): void;
    removeAllEventListeners(): void;
    protected abstract loop(): void;
}
