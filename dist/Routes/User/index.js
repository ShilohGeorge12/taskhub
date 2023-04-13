"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("../../Middlewares/Auth/index"));
const index_2 = require("../../Middlewares/Error/index");
const index_3 = __importDefault(require("../../Model/User/index"));
const index_4 = require("../../Validator/index");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const index_5 = __importDefault(require("../../Middlewares/Image/index"));
const userRoutes = (0, express_1.Router)();
userRoutes.get('/admin', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
    const admin = await index_3.default.findOne().select('_id username email isloggin image ');
    if (admin) {
        res.status(200).json(admin);
    }
}));
userRoutes.post('/editaccount', index_1.default, index_5.default.single('image'), (0, index_2.tryCatch)(async (req, res) => {
    var _a, _b;
    const { error } = (0, index_4.validateUser)(req.body);
    if (error) {
        console.log(error);
        const errArr = [];
        error.details.map(err => errArr.push(err.message));
        res.status(400).json({ error: errArr });
    }
    else {
        const user = await index_3.default.findOne().select('_id username email isLoggin image ');
        if (req.file && user) {
            user.image = {
                data: fs_1.default.readFileSync("dist/Uploads/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename)),
                contentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
            };
            user.username = req.body.username;
            user.email = req.body.email;
            await user.save();
            res.status(201).json(user);
        }
    }
}));
userRoutes.put('/login', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
    const admin = await index_3.default.findOne().select('_id username email isloggin image password ');
    if (admin) {
        const verify = await bcrypt_1.default.compare(req.body.password, admin.password);
        if (verify && req.body.username === admin.username) {
            admin.isloggin = true;
            await admin.save();
            res.status(200).json(admin);
        }
        else {
            res.status(400).json({ error: 'username or password is invalid' });
        }
    }
}));
userRoutes.get('/logout', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
    const admin = await index_3.default.findOne().select('_id username email isloggin image password ');
    if (admin) {
        admin.isloggin = false;
        await admin.save();
        res.status(200).json(admin);
    }
}));
exports.default = userRoutes;
