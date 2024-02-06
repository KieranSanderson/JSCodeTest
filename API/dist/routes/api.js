"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const types_1 = require("@src/types/types");
const HttpStatusCodes_1 = __importDefault(require("@src/types/HttpStatusCodes"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const db_1 = require("./db");
const mongo = (0, db_1.initialise)();
function getDBData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        jet_logger_1.default.info(`Getting data from DB`);
        const {} = req.query;
        const test = yield (yield mongo).find({
            date: {
                $gt: new Date('2023-01-03T00:00:00.000+00:00'),
                $lt: new Date('2023-01-06T24:00:00.000+00:00'),
            },
        }).exec();
        console.log({ test });
        const data = [1, 2, 3, 4];
        return res.status(HttpStatusCodes_1.default.OK).json(data);
    });
}
function getRandomData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        jet_logger_1.default.info(`Getting random data ${JSON.stringify(req.query)}`);
        const { dataLength = 100, } = req.query;
        const arr = Array.from({ length: dataLength }, () => Math.floor(Math.random() * 100));
        return res.status(HttpStatusCodes_1.default.OK).json(arr);
    });
}
const apiRouter = (0, express_1.Router)();
apiRouter.get(types_1.QueryType.GET_DB_DATA, getDBData);
apiRouter.get(types_1.QueryType.GET_RANDOM_DATA, getRandomData);
exports.default = apiRouter;
