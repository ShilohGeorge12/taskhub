"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const index_1 = require("./Middlewares/Error/index");
const index_2 = __importDefault(require("./DB/index"));
const index_3 = __importDefault(require("./Routes/Projects/index"));
const index_4 = __importDefault(require("./Routes/User/index"));
const app = (0, express_1.default)();
const port = `${process.env.PORT}`;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, index_2.default)();
app.get('/', (0, index_1.tryCatch)(async (req, res) => {
    res.send('Welcome To Taskhub Api');
}));
app.use('/api', index_3.default);
app.use('/api', index_4.default);
app.use('*', index_1.Errorhandler);
app.listen(port, () => console.log('listening...'));
