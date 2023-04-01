"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../Model/Projects/index"));
const express_1 = require("express");
const index_2 = require("../../Middlewares/Error/index");
const ProjectRoutes = (0, express_1.Router)();
ProjectRoutes.get('/projects', (0, index_2.tryCatch)(async (req, res) => {
    const projects = await index_1.default.find().sort({ name: 1 }).select('_id name description progress target task');
    res.status(200).json(projects);
}));
ProjectRoutes.post('/projects', (0, index_2.tryCatch)(async (req, res) => {
    const addProject = await index_1.default.create({
        name: req.body.name,
        description: req.body.description,
        target: req.body.target,
        task: req.body.task,
        progress: 0,
    });
    await addProject.save();
    res.status(200).json(addProject);
}));
exports.default = ProjectRoutes;
