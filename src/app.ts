import express from 'express';

import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';

import { routes } from './routes/Upload.routes';
import { pool } from './config/configDataBase/database';

const app = express();
pool.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
// liberar acesso das foto via rota
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
// http://localhost:3001/files/teste.jpg

app.use(routes);

export { app };
