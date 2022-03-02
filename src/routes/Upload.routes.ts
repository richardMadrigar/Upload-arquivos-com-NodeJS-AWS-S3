import { Router } from 'express';
import multer from 'multer';
import { multerConfig } from '../config/configMulter';

import { upload } from '../controllers/Upload.controller';

const routes = Router();

routes.post('/upload', multer(multerConfig).single('file'), upload);

export { routes };
