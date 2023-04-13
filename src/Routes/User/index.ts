import { Router } from "express";
import bcrypt from 'bcrypt';
import validateRoute from "../../Middlewares/Auth/index";
import { tryCatch } from "../../Middlewares/Error/index";
import User from "../../Model/User/index";
import { validateUser } from "../../Validator/index";
import fs from 'fs';
import { config } from "dotenv";
config()
import upload from "../../Middlewares/Image/index";

const userRoutes = Router();

userRoutes.get('/admin', validateRoute, tryCatch(async(req,res) => {
  const admin = await User.findOne().select('_id username email isloggin image ')
  if( admin ){
    res.status(200).json(admin);
  }
}));

userRoutes.post('/editaccount', validateRoute, upload.single('image'), tryCatch(async(req,res) => {
  const { error } = validateUser(req.body)
  if( error ){
    console.log( error );
    const errArr: (string| null)[] = [];
    error.details.map(err => errArr.push(err.message));
    res.status(400).json({ error: errArr });

  }else{

    const user = await User.findOne().select('_id username email isLoggin image ');
    if( req.file && user ){

      user.image = {
        data: fs.readFileSync( "dist/Uploads/" + req.file?.filename ),
        contentType: req.file?.mimetype,
      };
      user.username = req.body.username;
      user.email = req.body.email;
      await user.save();
      
      res.status(201).json(user)
    }
  }
}));

userRoutes.put('/login', validateRoute, tryCatch(async(req,res) => {
  const admin = await User.findOne().select('_id username email isloggin image password ');
  if( admin ){

    const verify = await bcrypt.compare( req.body.password, admin.password );
    
    if( verify && req.body.username === admin.username ){
      admin.isloggin = true;
      await admin.save();
      res.status(200).json( admin );
    }else{
      res.status( 400 ).json({ error: 'username or password is invalid' });
    }
  }
}));

userRoutes.get('/logout', validateRoute, tryCatch(async(req,res) => {
  const admin = await User.findOne().select('_id username email isloggin image password ');
  if( admin ){
    admin.isloggin = false;
    await admin.save();
    res.status(200).json( admin );
  }
}))

export default userRoutes;