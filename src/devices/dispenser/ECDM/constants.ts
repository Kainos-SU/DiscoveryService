import { BITS_DISP0, BITS_DISP1, STAT_BITS } from "./types";

export const STANDART_BYTES = Object.freeze({
  SOH:  0x01,
  STX:  0x02,
  EXT:  0x03,
  EOT:  0x04,
  ACK:  0x06,
  NCK:  0x15,
  ID:   0x30
});

export const COMMAND_CODES = Object.freeze({
  RESET:              0x44,
  STATUS:             0x50,
  PURGE:              0x51,
  DISPENSE:           0x52,
  TEST_DISPENSE:      0x53,
  LAST_STATUS:        0x55,
  SENSOR_DIAGNOSTICS: 0x58
});

export const ERROR_CODES: Map<number, string> = new Map([
  [0x01, "Banknote Pick Up Error"],
  [0x02, "TimeOut on the path between CHK Sensor and RVDT Start Sensor"],
  [0x03, "TimeOut on the path between DIV Sensor and EJT Sensor"],
  [0x04, "TimeOut on the path between EJT Sensor and EXIT Sensor"],
  [0x05, "A note Staying at EXT Sensor"],
  [0x06, "Ejecting the note suspected as rejected"],
  [0x07, "Abnormal note management (Flow Processing Error Inside)"],
  [0x08, "Abnormal note management (Flow Processing Error Inside)"],
  [0x09, "Jamming on EJT Sensor"],
  [0x0A, "Jamming on EXT Sensor"],
  [0x0B, "Detecting notes on the path before start of pick-up"],
  [0x0C, "Dispensing too many notes for one transaction\n(Default limit: 120 notes including all the rejected)"],
  [0x0D, "Rejecting too many notes for one transaction\n(Default limit: 20 notes)"],
  [0x0E, "Abnormal termination during purge execution"],
  [0x20, "Detecting sensor trouble or abnormal material before start"],
  [0x21, "Detecting sensor trouble or abnormal material before start"],
  [0x22, "Detecting trouble of solenoid operation before dispense"],
  [0x23, "Detecting trouble in motor or slit sensor before dispense"],
  [0x24, "Detecting no cassette0 requested to dispense banknotes"],
  [0x25, "Detecting Near-end status in the cassette requested to dispense\n(When Near-end detection mode is turned on)"],
  [0x26, "Detecting no reject tray before start or for operation"],
  [0x27, "Failed to calibrate sensors"],
  [0x28, "Jamming or sensor failure in the Cash Cassette"],
  [0x29, "More banknotes than the requested are dispensered."],
  [0x2A, "TimeOut on the path between RVDT Start Sensor and DIV Sensor"],
  [0x2B, "Dispensing is not terminated within 90 seconds."],
  [0x2C, "Detecting no cassette1 requested to dispense banknotes"],
  [0x30, "Recogniging abnormal Command"],
  [0x31, "Recognizing abnormal Parameters on the command"],
  [0x32, "Not to give Verify command on Reset after downloading program"],
  [0x33, "Failure of writing on program area"],
  [0x34, "Failure of Verify"]
]);

export const DISP0_BIT_MASK = Object.freeze<Record<BITS_DISP0, { state: string; bit: number }>>({
  DIV_L: {
    state: "Sensor DIV-L is Blocked and Off",
    bit: 0x01
  },
  DIV_R: {
    state: "Sensor DIV-R is Blocked and Off",
    bit: 0x02
  },
  EJT: {
    state: "Sensor EJT is Blocked and Off",
    bit: 0x04
  },
  EXT: {
    state: "Sensor EXT is Blocked and Off",
    bit: 0x08
  },
  RJT: {
    state: "Sensor RJT is Blocked and Off",
    bit: 0x10
  },
  SOL: {
    state: "Sensor SOL is Blocked and Off",
    bit: 0x20
  }
});

export const DISP1_BIT_MASK = Object.freeze<Record<BITS_DISP1, { state: string; bit: number }>>({
  RVST_L: {
    state: "Sensor RVST-L is Blocked and Off",
    bit: 0x01
  },
  RVST_R: {
    state: "Sensor RVST-R is Blocked and Off",
    bit: 0x02
  }
});

export const STAT_BIT_MASK = Object.freeze<Record<STAT_BITS, { state: string; bit: number }>>({
  CHK_L: {
    state: "Sensor CHK-L is Blocked and Off",
    bit: 0x01
  },
  CHK_R: {
    state: "Sensor CHK-R is Blocked and Off",
    bit: 0x02
  },
  CASSETTE_EXIST: {
    state: "Cassette exists in the postion",
    bit: 0x04
  },
  CASSETTE_NEAREND: {
    state: "Cassette is under Near-end Status",
    bit: 0x08
  },
  CB: {
    state: "Sensor CB is Blocked and Off",
    bit: 0x10
  }
});

export const COEFFICIENT_OF_VALUES = 0x20;
export const TYPE_CONSTANT = 0x30;
