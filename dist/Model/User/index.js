"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = (0, mongoose_1.model)('users', new mongoose_1.Schema({
    username: {
        type: String,
        minlength: 2,
        required: true,
    },
    email: {
        type: String,
        minlength: 20,
        maxlength: 40,
        required: true,
    },
    password: {
        type: String,
        minlength: 20,
        maxlength: 1024,
        required: true,
    },
    key: {
        type: String,
        minlength: 20,
        maxlength: 1024,
        required: true,
    }
}));
exports.default = User;
