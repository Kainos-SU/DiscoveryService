import { BaseAcceptor, IAcceptorStatus } from "../../model/IAcceptor";
import { IStatus } from "../../model/IStatus";
import { ISerialPort, SerialPortOption } from "../../serial/types";
import { Logger } from "../../../helpers/logger";
import { ACCEPTOR_EVENTS, GENERIC_RESPONSES, HOST_COMMANDS, REJECT_REASONS } from "./typed_constants";
import { checkCrc, formatMessage } from "./formatMessage";
import parseSetup, { SSPCurrencyTable } from "./parseCurrencyTable";

const log = new Logger("[NV9]");

const portParams = {
  baudRate: 9600,
  dataBit: 8,
  stopBits: 2
} as SerialPortOption;

export default class NV9 extends BaseAcceptor {

  private holding: boolean = false;
  private command: HOST_COMMANDS = HOST_COMMANDS.NO_COMMAND;
  private countryCode: string = "";
  private rejecting = false;

  public constructor(port: ISerialPort) {
    super(port);
    this.deviceType = "NV9";
  }

  private ok: boolean = true;
  private lastRawResponse: Array<number> = [];
  private currencyTable: SSPCurrencyTable = [];
  private channel: number = 0;
  private escrow: boolean = false;


  public checkStatus(): Promise<IStatus> {
    return Promise.resolve<IStatus>( {
      ok: this.ok,
      connected: this.connected,
      status: this.lastStatus,
      enabled: this.enable,
      rawResponse: this.lastRawResponse
    } as IStatus)
  }

  public getAcceptorStatus(): IAcceptorStatus {
    return {
      ok: this.ok,
      status: this.lastStatus,
      isFull: this.isFull,
      type: this.deviceType
    }
  }

  public enabled(enabled: boolean) {
    super.enabled(enabled);

    if (this.enable) {
      this.command = HOST_COMMANDS.ENABLE;
    } else {
      this.command = HOST_COMMANDS.DISABLE;
    }
  }

  private async sync(): Promise<void> {
    log.debug("Try to sync acceptor:");
    let answer: Array<number> = [];
    try {
      answer = await this.send(formatMessage(HOST_COMMANDS.SYNC, [], true));
    } catch (error: any) {
      throw new Error(`Error while SYNC acceptor!\n  ${error.message}`);
    }
    log.debug("SYNC answer: ", answer, "\Device is ok: ", answer[3] === 0xF0);
  }

  public reset(): void {
    this.command = HOST_COMMANDS.RESET;
  };

  private async resetDevice(): Promise<void> {
    log.debug("Try to reset device");
    let answer: Array<number> = [];
    try {
      answer = await this.send(formatMessage(HOST_COMMANDS.RESET), 6000);
      log.debug("RESET answer: ", answer);
      await new Promise(resolve => setTimeout(resolve, 7500));
      await this.sync();
    } catch (error: any) {
      throw new Error(`Error while resetting acceptor:\n ${error.message}`);
    }
  };

  public async init(): Promise<boolean> {
    if (!this.port) {
      log.debug("Port Not Found");
      return false;
    }
    log.info("Searching NV9 acceptor on: ", this.port.port);
    log.info("Send cash acceptor init command!");
    let answer: Array<number>;
    try {
      await this.port.open(portParams);
      await this.sync();
      // await this.resetDevice();
      answer = await this.send(formatMessage(HOST_COMMANDS.POLL));
      log.debug("POLL response: ", answer, "\nIs correct CRC: ", checkCrc(answer));
      answer = await this.send(formatMessage(HOST_COMMANDS.SETUP_REQUEST));
      log.debug("SETUP_REQUEST response: ", answer, "\nIs correct CRC: ", checkCrc(answer));
      const parsedSetup = parseSetup(answer);
      log.debug("Parsed setup: ", parsedSetup);
      if (parsedSetup.currencyTable && parsedSetup.currencyTable.length) {
        this.countryCode = parsedSetup.countryCode;
        this.currencyTable = parsedSetup.currencyTable;
        log.info("NV9 currency table: ", this.currencyTable);
      }
      answer = await this.send(formatMessage(HOST_COMMANDS.SET_INHIBITS, [0xFF, 0xFF]));
      log.debug("SET_INHIBIT response: ", answer, "\nIs correct CRC: ", checkCrc(answer));
      answer = await this.send(formatMessage(HOST_COMMANDS.GET_SERIAL_NUMBER));
      log.debug("SERIAL NUMBER of acceptor: ", answer.map((number) => "0x" + number.toString(16)));
      this.deviceType += ". Serial Number: " + answer.slice(4, 8).reduce((acc, current) => acc = (acc << 8) | current);
      if (!answer) {
        log.debugError("Error initialize NV9 Acceptor. No response!");
        try {
          await this.port.close();
        } catch {
          return false;
        }
      }
      await this.pollAcceptor();
      this.initLoop(150);
      log.debug("NV9 device found on port: ", this.port.port);
      return true;
    } catch (error) {
      log.debugError("Error while try to initialize NV9 acceptor: ", error);
      try {
        await this.port.close();
      } catch {
        log.debug("Error while closing port!");
      }
      return false;
    }
  }

  private async getLastReject() {
    try {
      const response: Array<number> = await this.send(formatMessage(HOST_COMMANDS.LAST_REJECT_CODE));
      log.debug("Last reject response: ", response);
      log.info("Bill rejected: ", REJECT_REASONS.get(response[4]));
      this.fireEvent("returned", response[5]);
    } catch (error) {
      throw error;
    }
  }

  private async pollAcceptor(): Promise<void> {
    if (!this.port) {
      return;
    }
    let response: Array<number> = [];
    try {
      if (this.command !== HOST_COMMANDS.NO_COMMAND) {
        if (this.command === HOST_COMMANDS.RESET) {
          log.debug("Got RESET command!");
          await this.resetDevice();
        } else if (this.command === HOST_COMMANDS.LAST_REJECT_CODE) {
          await this.getLastReject();
        } else {
          const enumEntries = Object.entries(HOST_COMMANDS).find(([ _, value ]) => value === this.command);
          const command: string = enumEntries ? enumEntries[0] : "Unknown";
          log.debug(`Got ${command} command!`);
          response = await this.send(formatMessage(this.command));
          log.debug(`Response of ${command}: `, response.map((element) => element.toString(16)));
        }
        this.command = HOST_COMMANDS.NO_COMMAND;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      let pollCommand: HOST_COMMANDS = HOST_COMMANDS.POLL;
      if (this.holding) {
        pollCommand = HOST_COMMANDS.HOLD;
      }
      response = await this.send(formatMessage(pollCommand));
    } catch (error: any) {
      this.command = HOST_COMMANDS.NO_COMMAND;
      log.error("Error fire error while polling device. Probably disconnected.\n", error.message);
      this.lastRawResponse = [];
      this.connected = false;
      this.ok = false;
      this.lastStatus = "Disconnected";
      return;
    }
    this.connected = true;
    this.lastRawResponse = response;
    this.ok = true;
    this.isFull = false;
    const genericResponse = response[3];
    const slaveResponse: Array<number> = response.length <= 6 ? [] : response.slice(4, response.length - 2);
    if (genericResponse !== GENERIC_RESPONSES.OK) {
      this.ok = false;
      const response: [string, number] | undefined = Object.entries(GENERIC_RESPONSES).find(([_, value]) => value === genericResponse);
      this.lastStatus = response ? response[0] : "Unknown";
      this.fireEvent("onError");
      return;
    }

    if (!slaveResponse.length || slaveResponse[0] !== ACCEPTOR_EVENTS.REJECTING) {
      if (this.rejecting) {
        this.command = HOST_COMMANDS.LAST_REJECT_CODE;
        this.rejecting = false;
      }
    }

    if (!slaveResponse.length) {
      log.debug("OK", response.map((number) => number.toString(16)), slaveResponse);
      this.lastStatus = "OK";
      return;
    }

    switch (slaveResponse[0]) {
      case ACCEPTOR_EVENTS.READ:
        this.channel = slaveResponse[1];
        this.escrow = true;
        log.debug("Reading note: ", this.channel);
        this.lastStatus = "Reading note";
        if (this.channel === 0) {
          break;
        }
        this.holding = true;
        log.debug("Got bill from channel: ", this.channel);
        this.fireEvent("billIn", this.channel);
        setTimeout(() => {
          if (!this.holding) {
            return;
          }
          this.escrow = false;
          this.holding = false;
          if ((this.command !== HOST_COMMANDS.POLL) && (this.command !== HOST_COMMANDS.REJECT)) {
            this.command = HOST_COMMANDS.REJECT;
          }
          log.debug("Bill returned because of Timeout!");
        }, 10000)
        break;
      case ACCEPTOR_EVENTS.STACKING:
        log.debug("Escrow: ", this.escrow);
        if (this.escrow) {
          this.escrow = false;
          this.fireEvent("billStacked");
        }
        this.lastStatus = "STACKING!";
        log.debug("STACKING bill from channel: ", this.channel);
        break;
      case ACCEPTOR_EVENTS.REJECTING:
        this.escrow = false;
        this.lastStatus = "Rejecting";
        this.rejecting = true;
        log.debug("REJECTING");
        break;
      case ACCEPTOR_EVENTS.STACKER_FULL:
        this.isFull = true;
        this.ok = false;
        this.lastStatus = "STACKER IS FULL";
        log.debug("Stacker is full!");
        this.fireEvent("onError");
        break;
      case ACCEPTOR_EVENTS.UNSAFE_JAM:
        this.lastStatus = "UNSAFE JAM";
      case ACCEPTOR_EVENTS.FRAUD_ATTEMPTS:
        this.lastStatus = "FRAUD ATTEMPTS";
        this.ok = false;
        break;
      default:
        const status: [string, number] | undefined = Object.entries<number>(ACCEPTOR_EVENTS).find((entrie: [string, number]) => entrie[1] === slaveResponse[0]);
        if (!status) {
          this.lastStatus = "OK";
          log.debug("OK");
          break;
        }
        this.lastStatus = status[0];
        log.debug(this.lastStatus);
    }
  }

  private accept() {
    this.rejecting = false;
    this.command = HOST_COMMANDS.POLL;
    this.holding = false;
  }

  private reject() {
    this.escrow = false;
    this.rejecting = false;
    this.command = HOST_COMMANDS.REJECT;
    this.holding = false;
  }

  private fireEvent (event: string, data?: number | string) {
    if (!this.events.has(event)) {
      return;
    }
    if (event === "returned") {
      this.ok = true;
      this.events.get("rejected")?.forEach((handler) => {
        handler({
          reason: data ? REJECT_REASONS.get(+ data) || "" : "Unknown",
          codeOfReject: data ? + data : NaN
        });
      });
    }
    log.debug("Fired Event: " + event);
    for (const handler of this.events.get(event) || []) {
      switch (event) {
        case "returned":
          this.ok = true;
          handler({
            reason: data ? REJECT_REASONS.get(+ data) || "" : "Unknown",
            codeOfReject: data ? + data : NaN
          });
          break;
        case "billStacked":
        case "billIn":
          this.ok = true;
          let value: number = 0;
          let currency: string = "";
          const reject = () => this.reject();
          const accept = () => this.accept();
          if (this.currencyTable.length) {
            const row = this.currencyTable.find(({ denominator }) => (this.channel) === denominator);
            value = row?.value || 0;
            currency = this?.countryCode || "";
          }
          handler({
            denominator: this.channel,
            value,
            currency,
            reject,
            accept
          });
          break;
        case "onError":
          this.ok = false;
          const reset = () => this.reset();
          handler({
            error: this.lastStatus,
            description: this.lastStatus,
            reset
          });
          break;
      }
    }
  }

  protected async loop(): Promise<void> {
    await this.pollAcceptor();
  }

  private async send(message: Array<number>, timeout = 200) {
    if (!this.port) {
      throw new Error("[NV9] Port not Defined")
    }
    // console.log("Message", message, "\ntimeout: ", timeout);
    let answer: Array<number>;
    try {
      answer = await this.port.writeAndRead(message, timeout);
    } catch (error) {
      throw error;
    }
    while (true) {
      try {
        const bytes: Array<number> = await this.port.redBytes();
        answer.push(...bytes);
      } catch {
        break;
      }
    }
    return answer;
  }
}