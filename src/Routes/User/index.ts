import { Router } from "express";
import jwt from 'jsonwebtoken'
import multer from "multer";
import validateRoute from "../../Middlewares/Auth/index";
import { tryCatch } from "../../Middlewares/Error/index";
import User from "../../Model/User/index";
import { validateUser } from "../../Validator/index";
import fs from 'fs'

const userRoutes = Router();
const storage = multer.diskStorage({
  destination: ( req, file, cb ) => {
    cb( null, 'dist/Uploads' )
  },
  filename: ( req, file, cb ) => {
    cb( null, file.originalname )
  }
});

const upload = multer({ storage: storage });


userRoutes.get('/admin', validateRoute, tryCatch(async(req,res) => {
  // const hash = jwt.sign('', 'shilohgeorge18');
  const admin = await User.findOne().select('_id username email isLoggin image profilepic ')
  if( admin ){
    res.status(200).json(admin);
  }
}));

userRoutes.post('/editaccount', upload.single('image'), tryCatch(async(req,res) => {
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
      
      console.log(req.body)
      res.status(201)
      .json(user)
      // .json({
      //   imageUrl: `data:${req.file.mimetype};base64,${base64String}`,
      // });
    }
  }
}));

// userRoutes.post('/editaccount', upload.single('image'), tryCatch(async(req,res) => {
//   const hash = jwt.sign('', 'shilohgeorge18');

//   console.log( 'file -> ',req.file )
//   const user = await User.create({
//     username: 'Shiloh George',
//     email: 'shilohgeorge2019@gmail.com',
//     pasword: hash,
//     isloggin: false,
//     image: {
//       data: fs.readFileSync( "dist/Uploads/" + req.file?.filename ),
//       contentType: req.file?.mimetype,
//     }
//   })
  
//   await user.save();
//   res.status(201).json({ message: 'success' });
// }))

userRoutes.put('/login', validateRoute, tryCatch(async(req,res) => {

}));

export default userRoutes;