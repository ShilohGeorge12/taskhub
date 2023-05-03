import Projects from "../../Model/Projects/index";
import { Router } from "express";
import { tryCatch } from "../../Middlewares/Error/index";
import { validateProjects } from "../../Validator/index";
import validateRoute from "../../Middlewares/Auth/index";

const ProjectRoutes = Router();

ProjectRoutes.get('/projects', validateRoute, tryCatch( async( req,res ) => {
  const projects = await Projects.find().sort({ name: 1 }).select('_id name description progress target task');
  console.log( projects );
  res.status(200).json(projects);
}))

ProjectRoutes.get('/projects/:id', validateRoute, tryCatch( async( req,res ) => {
  const projects = await Projects.findOne({ _id:req.params.id }).select('_id name description progress target task createdAt');
  if( projects ){
    res.status(200).json(projects);
  }else{
    res.status(404).json({ error: "Project Not Found!" });
  }
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
    res.status(201).json(addProject);
  }
}))

ProjectRoutes.put( '/projects/:id', validateRoute, tryCatch( async(req,res) => {
  const { error } = validateProjects( req.body );
  const updateProjects = await Projects.findOne({ _id:req.params.id }).select('_id name description progress target task createdAt');
  if( error ){
    console.log( error );
    const errArr: (string| null)[] = [];
    error.details.map(err => errArr.push(err.message));
    res.status(400).json({ error: errArr });
  }
  else if( updateProjects ){
    updateProjects.name = await req.body.name;
		updateProjects.description = await req.body.description;
		updateProjects.progress = await req.body.progress;
		updateProjects.target = await req.body.target;
		updateProjects.task = await req.body.task;
    await updateProjects.save();
    res.status(200).json(updateProjects);
  }else{
    res.status(404).json({ error: "Project Not Found!" });
  }
}))

ProjectRoutes.delete( '/projects/:id', validateRoute , tryCatch( async(req,res) => {
  const isProject = await Projects.exists({ _id: req.params.id });
  if(isProject){
    const project = await Projects.findByIdAndRemove({ _id:req.params.id });
    console.log( project );
    res.status(200).json({ message: 'Project Deleted!' });
  }else{
    res.status(404).json({ error: "Project Not found!" });
  };
}))

export default ProjectRoutes;