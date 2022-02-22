export type SerialPortOption = {
  baudRate: number;
  bufferSize?: number;
  dataBit?: 7 | 8;
  flowControl?: "none" | "hardware";
  parity?: "none" | "even" | "odd";
  stopBits?: 1 | 2;
};

export interface ISerialPort {
  port: any;
  open(option: SerialPortOption): Promise<void>;
  close(): Promise<void>;
  read(time?: number): Promise<Array<number>>;
  write(message: Array<number>): Promise<void>;
  writeString(message: String): Promise<void>;
  writeAndRead(message: Array<number>, readTimeout?: number, read?: boolean): Promise<Array<number>>;
  redBytes(timeout?: number): Promise<Array<number>>;
}
