export interface IECDMPortAnswer {
  error:      boolean;
  errorCode?: number;
  ack:        boolean;
  crc:        boolean;
  data:       Array<number>;
}

interface IECDMBASEStatus {
  error?:       string;
  errorCode:    number;
  rawResponse:  Array<number>;
}

export interface IECDMStatus extends IECDMBASEStatus {
  DISP0:      IDISP0Status;
  DISP1:      IDISP1Status;
  cassettes:  Array<IECDMCassetteStatus>;
}

export type SensorStatus = { description: string; state: boolean };
export type BITS_DISP0 = "DIV_L" | "DIV_R" | "EJT" | "EXT" | "RJT" | "SOL";
export type BITS_DISP1 = "RVST_L" | "RVST_R";
export type STAT_BITS = "CHK_L" | "CHK_R" | "CASSETTE_EXIST" | "CASSETTE_NEAREND" | "CB";

export type IDISP0Status = Record<BITS_DISP0, SensorStatus>;

export type IDISP1Status = Record<BITS_DISP1, SensorStatus>;

export type IECDMSTATStatus = Record<STAT_BITS, SensorStatus>

export interface IECDMCassetteStatus {
  cassetteNumber: number;
  inserted:       boolean;
  billThickness:  number;
  billLength:     number;
  status:         IECDMSTATStatus;
}

export interface IReject {
  cassetteNumber: number;
  exist:          boolean;
  rejected:       number;
  dispensed:      number;
}

export interface IECDMPurgeResponse extends IECDMBASEStatus {
  rejectedData: Array<IReject>;
}
