"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = (0, mongoose_1.model)('users', new mongoose_1.Schema({
    username: {
        type: String,
        minlength: 2,
    },
    email: {
        type: String,
        minlength: 20,
        maxlength: 40,
    },
    password: {
        type: String,
        minlength: 20,
        maxlength: 1024,
    },
    isloggin: {
        type: Boolean,
    },
    image: {
        data: Buffer,
        contentType: String
    },
}));
exports.default = User;
