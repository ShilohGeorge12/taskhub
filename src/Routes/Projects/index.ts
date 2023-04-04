import Projects from "../../Model/Projects/index";
import { Router } from "express";
import { tryCatch } from "../../Middlewares/Error/index";
import { validateProjects } from "../../Validator/index";
import validateRoute from "../../Middlewares/Auth/index";

const ProjectRoutes = Router();

ProjectRoutes.get('/projects', validateRoute, tryCatch( async( req,res ) => {
  const projects = await Projects.find().sort({ name: 1 }).select('_id name description progress target task')
  res.status(200).json(projects);
}))

ProjectRoutes.post('/projects', validateRoute, tryCatch( async( req,res ) => {
  const { error } = validateProjects( req.body );
  if( error ){
    console.log( error );
    const errArr: (string| null)[] = [];
    error.details.map(err => errArr.push(err.message));
    res.status(400).json({ error: errArr })
  }else{
    const addProject = await Projects.create({
      name: req.body.name,
      description: req.body.description,
      target: req.body.target,
      task: req.body.task,
      progress: 0,
    })
    await addProject.save();
    res.status(200).json(addProject);
  }
}))

ProjectRoutes.put( '/projects/:id', validateRoute, tryCatch( async(req,res) => {
  const { error } = validateProjects( req.body );

}))

export default ProjectRoutes;