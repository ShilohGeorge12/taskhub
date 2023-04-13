import multer from "multer";
import ImageError from "../Error/Custom/index";

const storage = multer.diskStorage({
  destination: ( req, file, cb ) => {
    cb( null, 'dist/Uploads' )
  },
  filename: ( req, file, cb ) => {
    cb( null, file.originalname )
  }
});

const upload = multer({ 
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file ,cb)=> {
    const fileTypes = /jpeg | jpg | png/;
    const mimeType = fileTypes.test( file.mimetype );
    const extName = fileTypes.test( file.originalname.toLowerCase() );
    if( mimeType && extName ){
      return cb( null, true );
    }else{
      return cb( new ImageError('Only jpeg, jpg, png images are allowed!') );
    }
  },
  storage: storage, 
});

export default upload;