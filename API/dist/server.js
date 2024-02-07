"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("@src/routes/api"));
const HttpStatusCodes_1 = __importDefault(require("@src/types/HttpStatusCodes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
// Basic middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Add APIs, must be after middleware
app.use('/api', api_1.default);
// Add error handler
app.use((err, _, res, next) => {
    var _a;
    let status = (_a = err.status) !== null && _a !== void 0 ? _a : HttpStatusCodes_1.default.BAD_REQUEST;
    mongoose_1.default.connection.close();
    return res.status(status).json({ error: err.message });
});
exports.default = app;
