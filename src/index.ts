import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config()
import { join } from 'path';
import { Errorhandler, tryCatch } from './Middlewares/Error/index';
import ConnectDb from './DB/index';
import ProjectRoutes from './Routes/Projects/index';
import userRoutes from './Routes/User/index';

const app = express();
const port = `${process.env.PORT}`;

app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

ConnectDb();
app.get('/', tryCatch(async( req,res ) => {
  res.sendFile(join(__dirname,'public/index.html'));
}))
app.use('/api', ProjectRoutes);
app.use('/api', userRoutes);

app.use('*', Errorhandler);

app.listen(port, () => console.log('listening...'));