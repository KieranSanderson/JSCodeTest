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
const apiRouter = (0, express_1.Router)();
const parseArguments = (query) => ({
    names: (query.names) ? JSON.parse(query.names) : undefined,
    startDate: (query.startDate) ? new Date(query.startDate) : undefined,
    endDate: (query.endDate) ? new Date(query.endDate) : undefined,
});
function getDBData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        jet_logger_1.default.info(`Getting data from DB`);
        const { names, startDate, endDate, } = parseArguments(req.query);
        jet_logger_1.default.info(`Query: ${JSON.stringify({
            names, namesType: typeof names,
            startDate, startDateType: typeof startDate,
            endDate, endDateType: typeof endDate,
        }, null, 2)}`);
        const data = yield (0, db_1.getData)({ names, startDate, endDate });
        return res.status(HttpStatusCodes_1.default.OK).json(data);
    });
}
apiRouter.get(types_1.QueryType.GET_DB_DATA, getDBData);
function getRandomData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        jet_logger_1.default.info(`Getting random data ${JSON.stringify(req.query)}`);
        const { dataLength = 100, } = req.query;
        const arr = Array.from({ length: dataLength }, () => Math.floor(Math.random() * 100));
        return res.status(HttpStatusCodes_1.default.OK).json(arr);
    });
}
apiRouter.get(types_1.QueryType.GET_RANDOM_DATA, getRandomData);
exports.default = apiRouter;
