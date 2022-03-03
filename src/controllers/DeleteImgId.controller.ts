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

    const SQL = 'DELETE FROM permissao_usuario WHERE key = $1';

    const { rowCount } = await pool.query(SQL, [key]);

    if (!rowCount) return res.status(400).json('Imagem não existe');

    const filePath = path.join(`${__dirname}, ../../../tmp/uploads/${key}k`);

    if (process.env.STORAGE_TYPE === 's3') {
      const params = { Bucket: `${process.env.AWS_BUCKET}`, Key: key };

      await s3.deleteObject(params).promise();
    } else {
      await fs.promises.stat(`${filePath}${key}`)
        .then(() => {
          fs.promises.unlink(filePath);
        })
        .catch((error) => {
          logger.fatal(error.message);
          throw new Error(error);
        });
    }

    return res.status(200).json('Img deletada com sucesso');
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json({ message: 'Internal Server error', error });
  }
};
