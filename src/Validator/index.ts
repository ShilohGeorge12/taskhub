import joi from "joi";
import { Request } from "express";

export function validateProjects(schema: Request){
  const joiSchema = joi.object({
    name: joi.string().min(2).required(),
    description: joi.string().min(2).max(40).required(),
    progress: joi.number().min(0).max(100),
    target: joi.string().min(1).required(),
    task: joi.array().required()
  })

  return joiSchema.validate(schema, { abortEarly: false })
};

