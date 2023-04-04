"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.genKey = exports.expTime = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const time = '1h';
const toMiliSeconds = (time) => {
    const t = time.split('h')[0];
    const toHour = 60 * 60 * 1000;
    const toMin = 60 * 1000;
    const secs = parseInt(t) * toMin;
    return secs;
};
exports.expTime = toMiliSeconds(time);
function genKey() {
    const key = jsonwebtoken_1.default.sign({}, `${process.env.key}`);
    return key;
}
exports.genKey = genKey;
;
function auth() {
    return jsonwebtoken_1.default.sign({}, `${process.env.auth}`);
}
// console.log(auth())
exports.errorResponse = { error: 'You are Not allowed!' };
function validateRoute(req, res, next) {
    const Keyref = `${process.env.refKey}`;
    const Authref = `${process.env.refAuth}`;
    const reqKey = req.headers['x-api-key'];
    const auth = req.headers.authorization;
    if (reqKey === Keyref && auth === Authref) {
        jsonwebtoken_1.default.verify(reqKey, `${process.env.key}`);
        jsonwebtoken_1.default.verify(auth, `${process.env.auth}`);
        next();
    }
    else {
        res.status(401).json(exports.errorResponse);
    }
}
exports.default = validateRoute;
