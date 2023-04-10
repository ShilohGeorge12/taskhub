import { Router } from "express";
import fileUpload from "express-fileupload";
import validateRoute from "../../Middlewares/Auth/index";
import { tryCatch } from "../../Middlewares/Error/index";

const userRoutes = Router();

userRoutes.get('/users', validateRoute, tryCatch(async(req,res) => {

}));

userRoutes.post('/users', fileUpload({ createParentPath:true }), tryCatch(async(req,res) => {
  const profilepic = req.files;
  const profilepic1 = req.body;
  console.log('-> ', profilepic );
  console.log('-> ', profilepic1 );
  res.status(200).json({ message: profilepic1 });
}));

userRoutes.put('/users/:id', validateRoute, tryCatch(async(req,res) => {

}));

export default userRoutes;