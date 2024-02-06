"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Set the env
const result2 = dotenv_1.default.config({
    path: path_1.default.join(__dirname, `../env/development.env`),
});
if (result2.error) {
    throw result2.error;
}
