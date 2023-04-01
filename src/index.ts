import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { join } from 'path';
config()

const app = express();
const port = `${process.env.PORT}`;

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));


app.listen(port, () => console.log('listening...'));