export interface ILCDMPortAnswer {
  error: boolean;
  errorCode?: number;
  ack: boolean;
  crc: boolean;
  data: Array<number>;
}

export interface ILCDMStatus {
  ok: boolean;
  errorStatus: string;
  errorCode: number;
  sensor0Status: { [s: string]: boolean };
  sensor1Status: { [s: string]: boolean };
  sensor0StatusHumanReadable: string;
  sensor1StatusHumanReadable: string;
}