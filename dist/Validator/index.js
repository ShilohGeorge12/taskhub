"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProjects = void 0;
const joi_1 = __importDefault(require("joi"));
function validateProjects(schema) {
    const joiSchema = joi_1.default.object({
        name: joi_1.default.string().min(2).required(),
        description: joi_1.default.string().min(20).max(20).required(),
        progress: joi_1.default.number().min(0).max(100).required(),
        target: joi_1.default.string().min(1).required(),
        task: joi_1.default.array().required()
    });
    return joiSchema.validate(schema, { abortEarly: false });
}
exports.validateProjects = validateProjects;
;
