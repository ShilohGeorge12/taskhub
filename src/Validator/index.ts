import joi from "joi";
import { Request } from "express";

export function validateProjects(schema: Request){
  const joiSchema = joi.object({
    name: joi.string().min(2).required(),
    description: joi.string().min(2).max(40).required(),
    progress: joi.number().min(0).max(100),
    target: joi.date().required(),
    task: joi.array().required()
  })

  return joiSchema.validate(schema, { abortEarly: false });
};

export function validateUser(schema: Request){
  const joiSchema = joi.object({
    username: joi.string().min(2),
    email: joi.string().email().min(20),
    password: joi.string().min(5),
    isloggin: joi.boolean(),
    image: joi.string(),
  })
  return joiSchema.validate(schema, { abortEarly: false });
};
