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
export declare class DeviceWrapper implements IDeviceWrapper {
    private enabled;
    private device?;
    private eventsHandlers;
    isEnabled(): boolean;
    checkStatus(): Promise<IStatus>;
    getPort(): ISerialPort | undefined;
    isMyPort(port: ISerialPort): boolean | undefined;
    setEnabled(enabled: boolean): void;
    clearDevice(): void;
    set setDevice(device: IDevice);
    on(event: string, handler: (obj: any) => any): void;
    off(event: string, handler: (obj: any) => any): void;
    getDevice(): IDevice | undefined;
}
