"use strict";
// Environments variables declared here
/* eslint-disable node/no-process-env */
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    NodeEnv: ((_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : ''),
    Port: ((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 0),
    MongoUri: ((_c = process.env.MONGODB_URI) !== null && _c !== void 0 ? _c : ''),
};
