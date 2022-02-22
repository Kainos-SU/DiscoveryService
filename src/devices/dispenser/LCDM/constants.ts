export const STANDART_BYTES = Object.freeze({
  SOH: 0x01,
  STX: 0x02,
  EXT: 0x03,
  EOT: 0x04,
  ACK: 0x06,
  NCK: 0x15,
  ID : 0x50
});

export const COMMAND_CODES = Object.freeze({
  PURGE:                    0x44,
  UPPER_DISPENSE:           0x45,
  STATUS:                   0x46,
  ROM_VERSION:              0x47,
  LOWER_DISPENSE:           0x55,
  UPPER_AND_LOWER_DISPENSE: 0x56,
  UPPER_TEST_DISPENSE:      0x76,
  LOWER_TEST_DISPENSE:      0x77
});

export const CODES_OF_COMMANDS:Map<number, String> = new Map([
  [0x44, "PURGE"],
  [0x45, "UPPER_DISPENSE"],
  [0x46, "STATUS"],
  [0x47, "ROM_VERSION"],
  [0x55, "LOWER_VERSION"],
  [0x56, "UPPER_AND_LOWER_DISPENSE"],
  [0x76, "TEST_DISPENSE"],
  [0x77, "LOWER_TEST_DISPENSE"]
]);

export const CODES_OF_ERRORS: Record<string, number> = Object.freeze({
  "Good": 0x30,
  "Normal Stop": 0x31,
  "Pickup error": 0x32,
  "JAM at CHK 1,2 Sensor": 0x33,
  "Overflow bill": 0x34,
  "JAM at EXIT Sensor or EJT Sensor": 0x35,
  "Jam at DIV Sensor": 0x36,
  "Undefined command": 0x37,
  "Bill-End": 0x38,
  "Note request error": 0x3B,
  "Counting Error(between DIV Sensor and EJT Sensor)": 0x3C,
  "Counting Error(between EJT Sensor and EXIT Sensor)": 0x3D,
  "Reject Tray is not recognized": 0x3f,
  "Motor Stop": 0x41,
  "Jam at Div Sensor": 0x42,
  "Timeout (From DIV Sensor to EJT Sensor)": 0x43,
  "Over Reject": 0x44,
  "Cassette is not recognized": 0x45,
  "Dispensing timeout": 0x47,
  "Diverter solenoid or SOL Sensor error": 0x49,
  "SOL Sensor error": 0x4A,
  "Purge error (Jam at Div Sensor)": 0x4E
});

export const ERROR_CODES:Map<number, string> = new Map([
  [0x30, "Good"],
  [0x31, "Normal Stop"],
  [0x32, "Pickup error"],
  [0x33, "JAM at CHK 1,2 Sensor"],
  [0x34, "Overflow bill"],
  [0x35, "JAM at EXIT Sensor or EJT Sensor"],
  [0x36, "Jam at DIV Sensor"],
  [0x37, "Undefined command"],
  [0x38, "Bill-End"],
  [0x3B, "Note request error"],
  [0x3C, "Counting Error(between DIV Sensor and EJT Sensor)"],
  [0x3D, "Counting Error(between EJT Sensor and EXIT Sensor)"],
  [0x3f, "Reject Tray is not recognized"],
  [0x41, "Motor Stop"],
  [0x42, "Jam at Div Sensor"],
  [0x43, "Timeout (From DIV Sensor to EJT Sensor)"],
  [0x44, "Over Reject"],
  [0x45, "Cassette is not recognized"],
  [0x47, "Dispensing timeout"],
  [0x49, "Diverter solenoid or SOL Sensor error"],
  [0x4A, "SOL Sensor error"],
  [0x4E, "Purge error (Jam at Div Sensor)"],
]);

export const STATUS_OF_CASSETTE = Object.freeze({
  0x30: "Enough Notes (Normal)",
  0x31: "Status of Near end"
} as Record<string, string>);

export const SENSOR_STATUS = Object.freeze({
  SENSOR_0: {
    CHK_SENSOR_1    : 0x01,
    CHK_SENSOR_2    : 0x02,
    DIV_SENSOR_1    : 0x04,
    DIV_SENSOR_2    : 0x08,
    EJT_SENSOR      : 0x10,
    EXIT_SENSOR     : 0x20,
    NEARENDO_SENSOR : 0x40,
  },
  SENSOR_1_LCDM_1000: {
    REJECT_TRAY_S_W  : 0x01,
    CASSETTE0_SENSOR : 0x02,
    SOL_SENSOR      : 0x04,
  },
  SENSOR_1_LCDM_2000: {
    SOL_SENSOR: 0x01,
    CASSETTE0_SENSOR: 0x02,
    CASSETTE1_SENSOR: 0x04,
    CHK_SENSOR_3: 0x08,
    CHK_SENSOR_4: 0x10,
    NEAREND1_SENSOR: 0x20,
    REJECT_TRAY_S_W: 0x40,
  }
});