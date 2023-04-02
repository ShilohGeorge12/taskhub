import { Router } from "express";
import { tryCatch } from "../../Middlewares/Error/index";
import { genKey, expTime } from "../../Middlewares/Auth/index";
const authRoute = Router();

authRoute.get('/genkey', tryCatch( async (req,res) => {
  const key = genKey();
  res.cookie( 'key', key, {
    httpOnly: true,
    maxAge: expTime,
    secure: true,
    sameSite: 'strict',
  })
  res.status(200).json({ key })
}))
export default authRoute;