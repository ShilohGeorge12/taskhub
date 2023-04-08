"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../../Middlewares/Auth/index"));
const index_2 = require("../../Middlewares/Error/index");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/users', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
}));
userRoutes.post('/users', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
}));
userRoutes.put('/users/:id', index_1.default, (0, index_2.tryCatch)(async (req, res) => {
}));
exports.default = userRoutes;
