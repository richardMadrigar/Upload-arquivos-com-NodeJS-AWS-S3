import { Router } from 'express';
import multer from 'multer';
import { multerConfig } from '../config/configMulter';
import { DeleteImgId } from '../controllers/DeleteImgId.controller';
import { ListUploadImgAll } from '../controllers/ListUploadImgAll.controller';

import { upload } from '../controllers/Upload.controller';

const routes = Router();

routes.post('/upload', multer(multerConfig).single('file'), upload);

routes.get('/listUploadsImgAll', ListUploadImgAll);

routes.delete('/delete/:key', DeleteImgId);

export { routes };
