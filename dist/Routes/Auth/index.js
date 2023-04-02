"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../../Middlewares/Error/index");
const index_2 = require("../../Middlewares/Auth/index");
const authRoute = (0, express_1.Router)();
authRoute.get('/genkey', (0, index_1.tryCatch)(async (req, res) => {
    const key = (0, index_2.genKey)();
    res.cookie('key', key, {
        httpOnly: true,
        maxAge: index_2.expTime,
        // secure: true,
        // sameSite: 'strict',
    });
    res.status(200).json({ key });
}));
exports.default = authRoute;
