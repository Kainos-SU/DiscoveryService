import { IDevice } from "./model/IDevice";
import { IStatus } from "./model/IStatus";
import { DeviceWrapper } from "./IDeviceWrapper";
import { DeviceType } from "./model/IDeviceType";
declare type Events = "connect" | "lost" | "change";
export declare type IDiscoveryEvent = {
    deviceType: DeviceType;
    deviceModel?: string;
    deviceStatus?: IStatus;
    device: IDevice;
};
export declare class DiscoveryService {
    private constructor();
    private prevStatuses;
    private static discovery;
    /**
     * Получение инстанса сервиса дискавери
     */
    static getInstance(): DiscoveryService;
    private deviceStatus;
    private devices;
    /**
     * Первичная инициализация инстанса дискавери
     */
    static init(): DiscoveryService;
    private initLoop;
    /** Цикл опроса устрйоств */
    private loop;
    /**
     * Получение статусов устройств
     */
    getDevicesStatus(): Map<DeviceType, IStatus | undefined>;
    /**
     * Хранилище обработчиков событий
     */
    private eventHandlersList;
    /**
     * Метод для подписки на события
     * @param event тип события - строка
     * @param handler функция колбек
     */
    subscribeOn(event: Events, handler: (payload?: IDiscoveryEvent) => void): void;
    /**
     * Метод для отписки от события
     * @param event тип события - строка
     * @param handler функция колбек для удаления
     */
    unsubscribeFrom(event: Events, handler: (payload?: IDiscoveryEvent) => void): void;
    /**
     * Функция сравнения двух статусов с интерфейсом IStatus. Если статусы различаються возвращает истину
     * @param {IStatus} firstStatus
     * @param {IStatus} secondStatus
     * @returns {boolean} Истина если статусы разные
     * @private
     */
    private compareStatuses;
    /**
     * Функция для вызова события
     * @param event
     * @param data
     * @private
     */
    private fireEvent;
    /**
     * Получение обьекта ацептора
     */
    getAcceptor(): DeviceWrapper;
    /**
     * Получение обьекта диспенсера
     */
    getDispenser(): DeviceWrapper;
    /**
     * Получение обьекта принтера
     */
    getPrinter(): DeviceWrapper;
    /**
     * Получение обертки устройства по типу
     *
     * @param type тип устройства
     */
    findDeviceWrapper(type: DeviceType): DeviceWrapper;
}
export {};
