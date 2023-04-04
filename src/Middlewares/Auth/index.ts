import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
import { Request, Response, NextFunction } from 'express';

export const errorResponse = { error: 'You are Not allowed!' };

function validateRoute( req:Request, res:Response, next:NextFunction ){
  const Keyref = `${process.env.refKey}`;
  const Authref = `${process.env.refAuth}`
  const reqKey = req.headers['x-api-key'];
  const auth = req.headers.authorization;

  if( reqKey === Keyref && auth === Authref ){
    jwt.verify( reqKey, `${process.env.key}` );
    jwt.verify( auth, `${process.env.auth}` );
    next();
  }else{
    res.status(401).json( errorResponse );
  }
}

export default validateRoute;