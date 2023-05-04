"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.validateProjects = void 0;
const joi_1 = __importDefault(require("joi"));
function validateProjects(schema) {
    const joiSchema = joi_1.default.object({
        name: joi_1.default.string().min(2).required(),
        description: joi_1.default.string().min(2).max(40).required(),
        progress: joi_1.default.number().min(0).max(100),
        target: joi_1.default.date().required(),
        task: joi_1.default.array().required()
    });
    return joiSchema.validate(schema, { abortEarly: false });
}
exports.validateProjects = validateProjects;
;
function validateUser(schema) {
    const joiSchema = joi_1.default.object({
        username: joi_1.default.string().min(2),
        email: joi_1.default.string().email().min(20),
        password: joi_1.default.string().min(5),
        isloggin: joi_1.default.boolean(),
        image: joi_1.default.string(),
    });
    return joiSchema.validate(schema, { abortEarly: false });
}
exports.validateUser = validateUser;
;
