"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logSchema = new mongoose_1.default.Schema({
    level: { type: String, required: true, index: true },
    message: { type: String, required: true, index: true },
    resourceId: { type: String, required: true, index: true },
    timestamp: { type: Date, required: true, index: true },
    traceId: { type: String, required: true },
    spanId: { type: String, required: true },
    commit: { type: String, required: true },
    metadata: {
        parentResourceId: { type: String }
    }
});
const Log = mongoose_1.default.model('Log', logSchema);
exports.default = Log;
