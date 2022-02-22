export class Logger {
  private static logLevel: "base" | "debug" | "none" | "only-error" = "base";
  private prefix: string = "base";

  public static initLogger(level?: "base" | "debug" | "none" | "only-error") {
    if (level) {
      Logger.logLevel = level;
    }
  }

  public static getLogLevel(): string {
    return Logger.logLevel;
  }

  public constructor(prefix?: string) {
    if (prefix) {
      this.prefix = prefix;
    }
  }

  public info(message: string, ...props: any[]) {
    if (Logger.logLevel !== "none" && Logger.logLevel !== "only-error") {
      console.log(this.prefix + " INFO: " + message + "\n", ...props);
      // console.log(this.prefix + " INFO: " + message + "\n", new Error().stack.match(/(?<= ).+(?=\n|$)/gm).map(str => str.trim()).slice(1).join("\n"), ...props);
    }
  }

  public error(message: string, ...props: any[]) {
    if (Logger.logLevel !== "none") {
      console.error(this.prefix + " ERROR: " + message, ...props);
    }
  }

  public debugError(message: string, ...props: any[]) {
    if (Logger.logLevel === "debug") {
      console.error(this.prefix + " _ERROR: " + message, ...props);
    }
  }

  public warning(message: string, ...props: any[]) {
    if (Logger.logLevel !== "none" && Logger.logLevel !== "only-error") {
      console.warn(this.prefix + ": " + message, ...props);
    }
  }

  public debug(message: string, ...props: any[]) {
    if (Logger.logLevel === "debug") {
      console.log(`${this.prefix}: ${message}`, ...props);
    }
  }
}
