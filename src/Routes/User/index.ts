import { Router } from "express";
import validateRoute from "../../Middlewares/Auth/index";
import { tryCatch } from "../../Middlewares/Error/index";

const userRoutes = Router();

userRoutes.get('/users', validateRoute, tryCatch(async(req,res) => {

}));

userRoutes.post('/users', validateRoute, tryCatch(async(req,res) => {

}));

userRoutes.put('/users/:id', validateRoute, tryCatch(async(req,res) => {

}));

export default userRoutes;