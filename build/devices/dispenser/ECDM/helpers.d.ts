import { IECDMStatus } from "./types";
import { IDispenseAnswer } from "../../model/IDispenser";
export declare function calculateXorCrc(message: Array<number>): number;
export declare function checkXorCrc(message: Array<number>): boolean;
export declare function parseStatus(data: Array<number>): IECDMStatus;
export declare function filterResponse(data: Array<number>): Array<number>;
export declare function prepareDataForDispense(dispenseData: Array<{
    cassette: number;
    count: number;
}>): Array<number>;
/**
 *
 * Функция для парсинга ответа от диспенсера.
 *
 * @param data Массив чисел(байтов) начиная (и включая) c SOH и заканчивая (также включая) BCC
 * @return IDispenseAnswer {
 *  crc: boolean;
 *  errorCode: number;
 *  errorText: string;
 *  cassettes: Array<{
 *    cassetteNumber: number;
 *    requestedBillCHK: number;   В этой модели диспенсера всегда равен значению EXIT
 *    requestedBillEXIT: number;
 *    rejectedBill: number;
 *    cassetteStatus: string;
 *  }>;
}
 */
export declare function parseDispenseData(data: Array<number>): IDispenseAnswer;
export declare function decodeValue(byte: number): number;
export declare function encodeValue(byte: number): number;
