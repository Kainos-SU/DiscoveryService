import {ISerialPort, SerialPortOption} from "../../serial/types";
import { BasePrinter, IPrinterStatus } from "../../model/IPrinter";
import {IStatus} from "../../model/IStatus";
import { encode } from "ibm866";
import { Logger } from "../../../helpers/logger";
import { IVKP80FullStatus } from "./types";
import { parseStatus } from "./helpers";
import { synchronized } from "d4c-queue";

const log = new Logger("[VKP-80]: ");

// const encode = require("ibm866").encode;

const portSettings: SerialPortOption = {
    baudRate: 38400,
    bufferSize: 255,
    dataBit: 8,
    flowControl: "none",
    parity: "none",
    stopBits: 1,
};

export default class VKP80 extends BasePrinter {

    private resolvePaperInOutput?: (value?: any) => void;

    public constructor(port: ISerialPort) {
        super(port);
        this.deviceType = "VKP80";
    }

    public async checkStatus(): Promise<IStatus> {
        const def = await this.getStatus()
        let status = "";
        Object.entries(def.PAPER_STATUS).forEach(([key, state]) => {
            if (state) {
                status += key + "\n";
            }
        })
        if (!status) {
            status = "No Error!";
        }
        return {
            ok: def.DLE && def.SECOND_BYTE,
            enabled: this.enable,
            connected: true,
            status,
            rawResponse: def.rawStatus
        };
    }

    public async cut(align:boolean = false) {
        console.log("Обрезаем", align)
        if(align) {
          //  console.log("Мы сюда попали в передачу байтов!")
          //  await this.port.write([0x1D,0xF8])
            await this.printLine('----------------------------------')
            await this.printLine('')
        } else {
            await this.printLine('')
            await this.printLine('')
            await this.port?.write([0x1b, 0x69])
            await this.port?.write([0x1D, 0x65, 0x03, 0xFF])
        }
    }

    public async reset(): Promise<void> {
        await this.port?.write([0x1B, 0x40]);
    }

    public async init(): Promise<boolean> {
        try {
            await this.port?.open(portSettings);
            await this.reset();
            let status = await this.getStatus();
            if (status.DLE && status.SECOND_BYTE) {
                this.initLoop(400);
                return true;
            }
            return false;
        } catch (err) {
            console.log(err);
            await this.port?.close();
            return false;
        }
    }

    protected async loop(): Promise<void> {
        const status = await this.getStatus();
    }

    public async printBarCode(code: string) {
        if (code.length > 13) {
            throw new Error("[VKP-80] String is to long for barcode! " + code);
        }
        await this.port?.write([0x1b, 0x61, 0x01])
        await this.port?.write([0x1D, 0x48, 0x02])
        await this.port?.write([0x1D, 0x66, 0x00])
        await this.port?.write([0x1D, 0x68, 0x51])
        await this.port?.write([0x1D, 0x77, 0x03])
        await this.port?.write([0x1D, 0x6B, 0x02])
        await this.port?.writeString(code)
        await this.port?.write([0x00, 0x00])
        await this.port?.writeString("\r\n")
    }

    public async printLine(message: string): Promise<void> {
        let messageConv = this.changeCode(message)
        await this.port?.write([0x1b, 0x74, 0x11])
        await this.port?.write([0x1b, 0x61, 0x01])
        await this.port?.write(Array.from(messageConv))
        await this.port?.write([0x0D, 0x0A])
    }

    public async romVersion(): Promise<IStatus> {
        const transmitPrinterId = [0x1D, 0x49];
        try {
            const printerModel = await this.port?.writeAndRead([...transmitPrinterId, 0x01], 50, true) || [];
            const typeId = await this.port?.writeAndRead([...transmitPrinterId, 0x02], 50, true) || [];
            const romVersionId = await this.port?.writeAndRead([...transmitPrinterId, 0x03], 50, true) || [];
            log.info("Printer Model: ", printerModel.map(num => num?.toString(16)));
            log.info("Type ID: ", typeId.map(num => num?.toString(16)));
            log.info("romVersion: ", romVersionId.map(num => num?.toString(16)));
            return {
                ok: true,
                enabled: this.enable,
                connected: true,
                status: "",
                rawResponse: [...printerModel, ...typeId, ...romVersionId],
            }
        } catch (error) {
            log.error("Can not get rom version");
            return {
                connected: false,
                enabled: this.enable,
                ok: false,
                rawResponse: [],
                status: "Can not get Rom Version"
            }
        }
    }

    private paperRemoved() {
        if (this.resolvePaperInOutput) {
            this.resolvePaperInOutput();
            this.resolvePaperInOutput = undefined;
        }
    }

    public paperRemovedFromInput(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.resolvePaperInOutput = resolve;
        }) as Promise<void>;
    }

    @synchronized
    async getStatus(): Promise<IVKP80FullStatus> {
        if (!this.port) return Promise.reject(new Error("Port is not exists!"));
        try {
            const buffer = await this.port.writeAndRead([0x10, 0x04, 0x14], 100);
            const status = parseStatus(buffer);
            const prevPaperInOutput = this.paperInOutput;
            this.paperInOutput = status.PAPER_STATUS.TICKET_PRESENT_IN_OUTPUT;
            if (!this.paperInOutput && prevPaperInOutput) {
                this.paperRemoved();
            }
            this.paperJam = status.RECOVERABLE_STATUS.PAPER_JAM;
            this.nearEnd = status.PAPER_STATUS.PAPER_NEAR_END;
            this.paperNotPresent = status.PAPER_STATUS.PAPER_NOT_PRESENT;
            this.coverOpen = status.USER_STATUS.COVER_OPEN || status.USER_STATUS.COVER_OPEN_1;
            let currentStatus = "";
            const setCurrentStatus = ([key, value]:  [string, boolean]) => {
                if (!value) {
                    return;
                }
                currentStatus += key.replaceAll("_", " ") + "\n";
            }
            Object.entries(status.PAPER_STATUS).forEach(setCurrentStatus);
            Object.entries(status.USER_STATUS).forEach(setCurrentStatus);
            Object.entries(status.RECOVERABLE_STATUS).forEach(setCurrentStatus);
            Object.entries(status.UNRECOVERABLE_ERROR).forEach(setCurrentStatus);

            if (currentStatus === "") {
                currentStatus = "OK"
            }

            this.lastStatus = currentStatus;

            return status;
        } catch(error: any) {
            throw new Error("Error of parsing message: " + error.message);
        }
    }

    changeCode(message: string) {
        return encode(message)
    }

    public getPrinterStatus(): IPrinterStatus {
        return {
            paperInOutput: this.paperInOutput,
            coverOpen: this.coverOpen,
            nearEnd: this.nearEnd,
            paperJam: this.paperJam,
            paperNotPresent: this.paperNotPresent,
            status: this.lastStatus,
            type: this.deviceType
        };
    }

    private fireEvent(event: any): void {

    }

}