import Projects from "../../Model/Projects/index";
import { Router } from "express";
import { tryCatch } from "../../Middlewares/Error/index";
const ProjectRoutes = Router();

ProjectRoutes.get('/projects', tryCatch(async( req,res ) => {
  const projects = await Projects.find().sort({ name: 1 }).select('_id name description progress target task')
  res.status(200).json(projects);
}))

ProjectRoutes.post('/projects', tryCatch( async( req,res ) => {
  const addProject = await Projects.create({
    name: req.body.name,
    description: req.body.description,
    target: req.body.target,
    task: req.body.task,
    progress: 0,
  })
  await addProject.save();
  res.status(200).json(addProject);
}))

export default ProjectRoutes;