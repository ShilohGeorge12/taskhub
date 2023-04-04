import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
import { Request, Response, NextFunction } from 'express';

const time: string = '1h';
const toMiliSeconds = (time: string) => {
  const t = time.split('h')[0];
  const toHour =  60 * 60 * 1000;
  const toMin =  60 * 1000;
  const secs = parseInt(t) * toMin;
  return secs;
};
export const expTime = toMiliSeconds(time);

export function genKey(){
  const key = jwt.sign({}, `${process.env.key}`);
  return key;
};

function auth(){
  return jwt.sign({}, `${process.env.auth}`);
}
// console.log(auth())
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