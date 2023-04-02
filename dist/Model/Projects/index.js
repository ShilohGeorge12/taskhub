"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Projects = (0, mongoose_1.model)('projects', new mongoose_1.Schema({
    name: {
        type: String,
        minlength: 2,
        maxLenght: 100,
        required: true,
    },
    description: {
        type: String,
        minlength: 2,
        maxlength: 40,
        required: true,
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
    },
    target: {
        type: String,
        minLenght: 1,
        required: true,
    },
    task: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    }
}));
exports.default = Projects;
