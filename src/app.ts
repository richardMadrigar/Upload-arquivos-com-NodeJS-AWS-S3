import express from 'express';

import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import { routes } from './routes/Upload.routes';
import { pool } from './config/configDataBase/database';

const app = express();
pool.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use(routes);

export { app };
