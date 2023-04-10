"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const index_1 = __importDefault(require("../../Middlewares/Auth/index"));
const index_2 = require("../../Middlewares/Error/index");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/users', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
}));
userRoutes.post('/users', (0, express_fileupload_1.default)({ createParentPath: true }), (0, index_2.tryCatch)(async (req, res) => {
    const profilepic = req.files;
    const profilepic1 = req.body;
    console.log('-> ', profilepic);
    console.log('-> ', profilepic1);
    res.status(200).json({ message: profilepic1 });
}));
userRoutes.put('/users/:id', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
}));
exports.default = userRoutes;
