"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./pre-start"); // Must be the first import
const jet_logger_1 = __importDefault(require("jet-logger"));
const EnvVars_1 = __importDefault(require("@src/types/EnvVars"));
const server_1 = __importDefault(require("./server"));
// **** Run **** //
server_1.default.listen(EnvVars_1.default.Port, () => jet_logger_1.default.info(`Express server started on port: ${EnvVars_1.default.Port.toString()}`));
