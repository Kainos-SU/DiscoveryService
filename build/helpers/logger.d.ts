export declare class Logger {
    private static logLevel;
    private prefix;
    static initLogger(level?: "base" | "debug" | "none" | "only-error"): void;
    static getLogLevel(): string;
    constructor(prefix?: string);
    info(message: string, ...props: any[]): void;
    error(message: string, ...props: any[]): void;
    debugError(message: string, ...props: any[]): void;
    warning(message: string, ...props: any[]): void;
    debug(message: string, ...props: any[]): void;
}
