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
exports.getData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EnvVars_1 = __importDefault(require("@src/types/EnvVars"));
const jet_logger_1 = __importDefault(require("jet-logger"));
mongoose_1.default.connect(EnvVars_1.default.MongoUri.toString());
jet_logger_1.default.info(`Connection set up to: ${EnvVars_1.default.MongoUri}`);
const conversion = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId },
    date: { type: String },
    name: { type: String },
    hourlyData: [{ type: Number }],
}, { collection: 'ConversionRates' });
const conversionData = mongoose_1.default.model('ConversionRates', conversion);
const buildFilter = ({ names, startDate, endDate }) => __awaiter(void 0, void 0, void 0, function* () {
    var filter = {};
    if (names)
        filter.name = names;
    if (startDate)
        filter.startDate = { $gt: startDate };
    if (startDate)
        filter.endDate = { $lt: endDate };
    return filter;
});
const getData = ({ names, startDate, endDate }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = yield buildFilter({ names, startDate, endDate });
        const data = yield conversionData.find(filter).exec();
        return data;
    }
    catch (err) {
        jet_logger_1.default.err(err);
        return 'error occured';
    }
});
exports.getData = getData;
