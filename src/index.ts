import { DiscoveryService } from "./devices/DiscoveryService";
import { Logger } from "./helpers/logger";

Logger.initLogger("debug");

DiscoveryService.init();
console.log("Started");