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
    const projects = await index_1.default.find().sort({ name: 1 }).select('_id name description progress target task createdAt');
    console.log(projects);
    res.status(200).json(projects);
}));
ProjectRoutes.get('/projects/:id', index_4.default, (0, index_2.tryCatch)(async (req, res) => {
    const projects = await index_1.default.findOne({ _id: req.params.id }).select('_id name description progress target task createdAt');
    if (projects) {
        res.status(200).json(projects);
    }
    else {
        res.status(404).json({ error: "Project Not Found!" });
    }
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
        res.status(201).json(addProject);
    }
}));
ProjectRoutes.put('/projects/:id', index_4.default, (0, index_2.tryCatch)(async (req, res) => {
    const { error } = (0, index_3.validateProjects)(req.body);
    const updateProjects = await index_1.default.findOne({ _id: req.params.id }).select('_id name description progress target task createdAt');
    if (error) {
        console.log(error);
        const errArr = [];
        error.details.map(err => errArr.push(err.message));
        res.status(400).json({ error: errArr });
    }
    else if (updateProjects) {
        updateProjects.name = await req.body.name;
        updateProjects.description = await req.body.description;
        updateProjects.progress = await req.body.progress;
        updateProjects.target = await req.body.target;
        updateProjects.task = await req.body.task;
        await updateProjects.save();
        res.status(200).json(updateProjects);
    }
    else {
        res.status(404).json({ error: "Project Not Found!" });
    }
}));
ProjectRoutes.delete('/projects/:id', index_4.default, (0, index_2.tryCatch)(async (req, res) => {
    const isProject = await index_1.default.exists({ _id: req.params.id });
    if (isProject) {
        const project = await index_1.default.findByIdAndRemove({ _id: req.params.id });
        console.log(project);
        res.status(200).json({ message: 'Project Deleted!' });
    }
    else {
        res.status(404).json({ error: "Project Not found!" });
    }
    ;
}));
exports.default = ProjectRoutes;
