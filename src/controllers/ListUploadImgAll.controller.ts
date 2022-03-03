import { Request, Response } from 'express';
import { pool } from '../config/configDataBase/database';
import logger from '../config/configLogger';

export const ListUploadImgAll = async (req: Request, res: Response) => {
  try {
    const SQL = 'SELECT * FROM permissao_usuarios';

    const { rows } = await pool.query(SQL);

    return res.status(200).json(rows);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
