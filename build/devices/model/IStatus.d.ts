export interface IStatus {
    ok: boolean;
    enabled: boolean;
    connected: boolean;
    status: string;
    rawResponse: Array<number>;
}
