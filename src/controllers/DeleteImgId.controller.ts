import { Request, Response } from 'express';

import aws from 'aws-sdk';
import path from 'path';
import fs from 'fs';

import { pool } from '../config/configDataBase/database';
import logger from '../config/configLogger';

const s3 = new aws.S3();

export const DeleteImgId = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;

    const filePath = path.join(`${__dirname}, ../../../tmp/uploads/${key}`);

    const { rowCount } = await pool.query('DELETE FROM permissao_usuarios WHERE key = $1', [key]);

    if (!rowCount) return res.status(400).json('Imagem não existe');

    if (process.env.STORAGE_TYPE === 's3') {
      const params = { Bucket: `${process.env.AWS_BUCKET}`, Key: key };

      await s3.deleteObject(params).promise();
    } else {
      fs.promises.unlink(filePath);
    }

    return res.status(200).json('Img deletada com sucesso');
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
