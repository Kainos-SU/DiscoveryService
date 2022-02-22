import { ISerialPort, SerialPortOption } from "./types";
export default class NodeSerialPort implements ISerialPort {
    private _port;
    private path;
    private isListening;
    private isReading;
    private readBuffer;
    private activeReject;
    private onData;
    private onReadable;
    private readBytesTimeoutIndex;
    private static portSettingsDefault;
    constructor(path: string);
    static getPorts(): Promise<Array<NodeSerialPort>>;
    get port(): string;
    open(option?: SerialPortOption): Promise<void>;
    close(): Promise<void>;
    /** Реализация чтения с порта в режиме паузи */
    private pausePort;
    private resumePort;
    writeAndRead(message: Array<number>, readTimeout?: number, read?: boolean): Promise<Array<number>>;
    redBytes(timeout?: number): Promise<Array<number>>;
    read(timeout?: number): Promise<Array<number>>;
    write(message: Array<number>): Promise<void>;
    writeString(message: string): Promise<void>;
    private onReadableEvent;
    private onReadFinishEvent;
}
