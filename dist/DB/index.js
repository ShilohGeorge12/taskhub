"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function ConnectDb() {
    try {
        const connectKey = `${process.env.DB_CONNECT}`;
        mongoose_1.default.set('strictQuery', false);
        mongoose_1.default.connect(connectKey);
    }
    catch (error) {
        console.warn(error);
    }
}
exports.default = ConnectDb;
