import { IDevice } from "./model/IDevice";
import NodeSerialPort from "./serial/NodeSerialPort";
import { IStatus } from "./model/IStatus";
import { DeviceWrapper } from "./IDeviceWrapper";
import ID003 from "./accceptor/ID003";
import NV9 from "./accceptor/NV9/index";
import LCDM from "./dispenser/LCDM";
import ECDM from "./dispenser/ECDM";
import MINIMECH from "./dispenser/MINIMECH";
import { DeviceType } from "./model/IDeviceType";
import { ISerialPort } from "./serial/types";
import VKP80 from "./printer/vkp80II";

import { Logger } from "../helpers/logger";

const log = new Logger("[DiscoveryService]");

type IDeviceClass = { new (port: ISerialPort): IDevice };

type Events = "connect" | "lost" | "change";

export type IDiscoveryEvent = { deviceType: DeviceType; deviceModel?: string, deviceStatus?: IStatus, device: IDevice };

const availableDevicesMap: Map<DeviceType, Array<IDeviceClass>> = new Map([
  [DeviceType.DISPENSER, [
    LCDM,
    ECDM,
    MINIMECH
  ]],
  [DeviceType.ACCEPTOR, [
    // ID003,
    // NV9
  ]],
  [DeviceType.PRINTER, [
    // VKP80
  ]]
]);

export class DiscoveryService {
  private constructor() {}

  private prevStatuses: Record<DeviceType, IStatus> = {} as Record<DeviceType, IStatus>;

  private static discovery: DiscoveryService;

  /**
   * Получение инстанса сервиса дискавери
   */
  public static getInstance(): DiscoveryService {
    if (!DiscoveryService.discovery) {
      DiscoveryService.discovery = new DiscoveryService();
    }
    return DiscoveryService.discovery;
  }

  private deviceStatus = new Map<DeviceType, IStatus | undefined>();
  private devices = new Map([
    [DeviceType.DISPENSER, new DeviceWrapper()],
    [DeviceType.ACCEPTOR, new DeviceWrapper()],
    [DeviceType.PRINTER, new DeviceWrapper()]
  ]);

  /**
   * Первичная инициализация инстанса дискавери
   */
  public static init(): DiscoveryService {
    const ds = DiscoveryService.getInstance();
    log.info("Discovery service initialize!");
    ds.initLoop();
    return ds;
  }

  private initLoop() {
    let isWork = false;
    this.loop().finally(() =>
      setInterval(async () => {
        if (isWork) return;
        try {
          isWork = true;
          await this.loop();
        } finally {
          isWork = false;
        }
      }, 10000)
    );
  }

  /** Цикл опроса устрйоств */
  private async loop() {
    log.debug("Loop tick.");
    for (const [name, device] of this.devices) {
      log.debug("Device check: ", name);
      let status: IStatus;
      try {
        status = await device.checkStatus();
      } catch (error) {
        status = {
          ok: false,
          connected: false,
          enabled: false,
          status: "Not enabled",
          rawResponse: []
        };
      }
      log.debug("Response from ", name, status);
      if(!this.prevStatuses[name]) {
        this.prevStatuses[name] = status;
      } else {
        if (this.compareStatuses(this.prevStatuses[name], status)) {
          this.prevStatuses[name] = status;
          const deviceModel = device.getDevice() ? device.getDevice()?.getType() : "Not Set";
          this.fireEvent("change", { deviceType: name, deviceModel, deviceStatus: status, device: device.getDevice() })
        }
      }

      if (status.connected) {
        log.debug("Found connected device:", `Status of ${name} ${device.getDevice()?.getType()} - connected!`);
        const prevStatus = this.deviceStatus.get(name)
        if ((!prevStatus || !prevStatus.connected) && device.getDevice()?.getType().includes("MOCK")) {
          this.fireEvent("connect", { deviceType: name, deviceModel: device.getDevice()?.getType(), deviceStatus: await device.checkStatus() })
        }
        this.deviceStatus.set(name, status);
        continue;
      }

      this.deviceStatus.set(name, undefined);

      if (device.getDevice()) {
        log.info("Lost Device: ", name, device.getDevice()?.getType());
        this.fireEvent("lost", { deviceType: name, deviceModel: device.getDevice()?.getType() })
      }

      log.debug(`Searching Device: ${name}`);

      device.clearDevice();
      const ports = await NodeSerialPort.getPorts();
      const usedPorts = Array.from<[DeviceType, DeviceWrapper]>(this.devices.entries())
        .map(([_, value]) => value.getPort()?.port)
        .filter((port) => port !== undefined);

      const portsToCheck = ports.filter((el) => !usedPorts.includes(el.port));
      for (const port of portsToCheck) {
        try {
          await port.close();
        } catch (err) {
          // log.debugError(`Error of closing port: ${port.port}!\n`, err)
        }

        const devices = availableDevicesMap.get(name);
        if (!devices) continue;

        let found = false;
        for (const dev of devices) {
          const deviceInstance = new dev(port);
          try {
            found = await deviceInstance.init();
            if (found) {
              device.setDevice = deviceInstance;
              log.info(`[${name}] Device is found! Model=${deviceInstance.getType()}`);
              this.fireEvent("connect", { deviceType: name, deviceModel:deviceInstance.getType(), deviceStatus: await device.checkStatus() })
              break;
            }
          } catch (err) {
            log.debugError("Error while initialize device: ", err);
          }
        }
        if (found) break;
      }
    }
  }

  /**
   * Получение статусов устройств
   */
  public getDevicesStatus(): Map<DeviceType, IStatus | undefined> {
    return this.deviceStatus;
  }

  /**
   * Хранилище обработчиков событий
   */
  private eventHandlersList: Record<Events, Array<(payload?: any)=>void>> = {
    connect: [],
    lost: [],
    change: []
  }

  /**
   * Метод для подписки на события
   * @param event тип события - строка
   * @param handler функция колбек
   */
  public subscribeOn(event: Events, handler: (payload?: IDiscoveryEvent) => void) {
    if (!Object.keys(this.eventHandlersList).includes(event)) {
      log.debugError("Try to subscribe to not existing event: ", event);
      return;
    }
    this.eventHandlersList[event].push(handler);
  }

  /**
   * Метод для отписки от события
   * @param event тип события - строка
   * @param handler функция колбек для удаления
   */
  public unsubscribeFrom(event: Events, handler: (payload?: IDiscoveryEvent) => void) {
    if (!Object.keys(this.eventHandlersList).includes(event)) {
      log.debugError("Try to unsubscribe from not existing event: ", event);
      return;
    }
    const handlerIndex = this.eventHandlersList[event].indexOf(handler);
    if (-1 === handlerIndex) {
      log.debugError("Not found required handler for event: ", event, "\nGot handlers: ", this.eventHandlersList);
      return;
    }
    this.eventHandlersList[event].splice(handlerIndex, 1);
  }

  /**
   * Функция сравнения двух статусов с интерфейсом IStatus. Если статусы различаються возвращает истину
   * @param {IStatus} firstStatus
   * @param {IStatus} secondStatus
   * @returns {boolean} Истина если статусы разные
   * @private
   */
  private compareStatuses(firstStatus: IStatus, secondStatus: IStatus): boolean {
    for (const field in firstStatus) {
      if (!(firstStatus.hasOwnProperty(field)) || !(secondStatus.hasOwnProperty(field))) {
        return true;
      }
      //@ts-ignore
      if ((field !== "rawResponse") && ((field in firstStatus) && (field && secondStatus)) && (firstStatus[field] !== secondStatus[field])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Функция для вызова события
   * @param event
   * @param data
   * @private
   */
  private fireEvent(event: Events, data: { deviceType: DeviceType; deviceModel?: string, deviceStatus?: IStatus, device?: IDevice }) {
    log.debug("FireEvent");
    this.eventHandlersList[event].forEach((handler) => {
      handler(data);
    });
  }

  /**
   * Получение обьекта ацептора
   */
  public getAcceptor(): DeviceWrapper {
    return this.findDeviceWrapper(DeviceType.ACCEPTOR);
  }

  /**
   * Получение обьекта диспенсера
   */
  public getDispenser(): DeviceWrapper {
    return this.findDeviceWrapper(DeviceType.DISPENSER);
  }

  /**
   * Получение обьекта принтера
   */
  public getPrinter(): DeviceWrapper {
    return this.findDeviceWrapper(DeviceType.PRINTER);
  }

  /**
   * Получение обертки устройства по типу
   *
   * @param type тип устройства
   */
  public findDeviceWrapper(type: DeviceType): DeviceWrapper {
    const wrapper = this.devices.get(type);
    if (!wrapper) {
      throw new Error(`[Discovery]: Device [${type}] not found!`);
    }

    return wrapper;
  }
}
