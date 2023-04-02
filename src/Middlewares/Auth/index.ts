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
  const key = jwt.sign({}, `${process.env.key}`, {
    expiresIn: time,
  })
  return key;
};


function validateRoute(req:Request, res:Response, next:NextFunction){
  const key: string | undefined = req.cookies.key
  const hKey = req.headers['x-api-key'];

  if( typeof key === 'string' && typeof hKey === 'string' ){
    if( key === hKey ){
      const verify = jwt.verify(key, `${process.env.key}`)
      if( verify ){
        next()
      }else{
        res.status(401).json({ error:'You are Not allowed!'})
      }
    }
  }else{
    res.status(401).json({ error:'You are Not allowed!'})
  }
}

export default validateRoute;