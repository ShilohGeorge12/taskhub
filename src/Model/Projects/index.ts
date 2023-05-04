import { model, Schema } from "mongoose";

export interface IProjects {
  name: string,
  description: string,
  progress?: number,
  target: Date,
  task: (unknown)[],
  createdAt?: Date,
}

const Projects = model('projects', new Schema<IProjects>({
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
    type: Date,
    required: true,
  },
  task: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  }
}))

export default Projects;