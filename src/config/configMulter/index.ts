import { Request } from 'express';

import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';

export const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'), // para onde os arquivos vao quando fizer o upload

  storage: multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(16).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      cb(null, fileName);
    },
  }),

  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB =>  limite para os arquivos

  // filtrar tipos de arquivos
  // eslint-disable-next-line no-undef
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('invalid file type'));
    }
  },
};
