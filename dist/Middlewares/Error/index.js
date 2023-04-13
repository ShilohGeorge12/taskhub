"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = exports.Errorhandler = void 0;
const index_1 = require("../Auth/index");
const index_2 = __importDefault(require("./Custom/index"));
function Errorhandler(err, req, res, next) {
    console.log('-> ', {
        name: err.name,
        msg: err.message,
        stack: err.stack,
    });
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json(index_1.errorResponse);
    }
    if (err instanceof index_2.default) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
}
exports.Errorhandler = Errorhandler;
;
function tryCatch(Handler) {
    return async (req, res, next) => {
        try {
            await Handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.tryCatch = tryCatch;
;
