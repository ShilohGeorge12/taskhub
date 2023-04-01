"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = exports.Errorhandler = void 0;
function Errorhandler(err, req, res, next) {
    console.log('-> ', {
        name: err.name,
        msg: err.message,
    });
    res.status(500).json({ error: err.message });
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
