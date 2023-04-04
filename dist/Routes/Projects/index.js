"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../Model/Projects/index"));
const express_1 = require("express");
const index_2 = require("../../Middlewares/Error/index");
const index_3 = require("../../Validator/index");
const index_4 = __importDefault(require("../../Middlewares/Auth/index"));
const ProjectRoutes = (0, express_1.Router)();
ProjectRoutes.get('/projects', index_4.default, (0, index_2.tryCatch)(async (req, res) => {
    const projects = await index_1.default.find().sort({ name: 1 }).select('_id name description progress target task');
    res.status(200).json(projects);
}));
ProjectRoutes.post('/projects', index_4.default, (0, index_2.tryCatch)(async (req, res) => {
    const { error } = (0, index_3.validateProjects)(req.body);
    if (error) {
        console.log(error);
        const errArr = [];
        error.details.map(err => errArr.push(err.message));
        res.status(400).json({ error: errArr });
    }
    else {
        const addProject = await index_1.default.create({
            name: req.body.name,
            description: req.body.description,
            target: req.body.target,
            task: req.body.task,
            progress: 0,
        });
        await addProject.save();
        res.status(200).json(addProject);
    }
}));
ProjectRoutes.put('/projects/:id', index_4.default, (0, index_2.tryCatch)(async (req, res) => {
    const { error } = (0, index_3.validateProjects)(req.body);
}));
exports.default = ProjectRoutes;
