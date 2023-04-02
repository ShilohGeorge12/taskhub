import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { join } from 'path';
config()
import { Errorhandler } from './Middlewares/Error/index';
import ConnectDb from './DB/index';
import ProjectRoutes from './Routes/Projects/index';
import authRoute from './Routes/Auth/index';

const app = express();
const port = `${process.env.PORT}`;

app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

ConnectDb();
app.use('/api', authRoute);
app.use('/api', ProjectRoutes);
app.use('*', Errorhandler);

app.listen(port, () => console.log('listening...'));