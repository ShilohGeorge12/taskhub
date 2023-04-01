"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = `${process.env.PORT}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static((0, path_1.join)(__dirname, 'public')));
app.listen(port, () => console.log('listening...'));
