"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genKey = exports.expTime = void 0;
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
    const key = jsonwebtoken_1.default.sign({}, `${process.env.key}`, {
        expiresIn: time,
    });
    return key;
}
exports.genKey = genKey;
;
function validateRoute(req, res, next) {
    const key = req.cookies.key;
    const hKey = req.headers['x-api-key'];
    if (typeof key === 'string' && typeof hKey === 'string') {
        if (key === hKey) {
            const verify = jsonwebtoken_1.default.verify(key, `${process.env.key}`);
            if (verify) {
                next();
            }
            else {
                res.status(401).json({ error: 'You are Not allowed!' });
            }
        }
    }
    else {
        res.status(401).json({ error: 'You are Not allowed!' });
    }
}
exports.default = validateRoute;
