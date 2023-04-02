import { Request, Response, NextFunction } from 'express';

type Ttrycatch = (req: Request, res: Response, next: NextFunction ) => Promise<void>

export function Errorhandler(err: Error, req: Request, res: Response, next: NextFunction){
  console.log('-> ', {
    name: err.name,
    msg: err.message,
    stack: err.stack,
  });
  res.status(500).json({ error: err.message })
};

export function tryCatch( Handler: Ttrycatch ){
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
};