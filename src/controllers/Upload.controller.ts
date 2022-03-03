import { Request, Response } from 'express';
import { pool } from '../config/configDataBase/database';
import logger from '../config/configLogger';

interface IPropsFile {
  originalname?: string;
  size?: string;
  key?: string;
  location?: string;
}

export const upload = async (req: Request, res: Response) => {
  const result: IPropsFile | any = req.file;

  if (!result) return res.status(400).json({ message: 'nao tem conteudo' });

  const {
    originalname: name, size, key, location,
  } = result;

  try {
    const SQL = `INSERT INTO permissao_usuarios ( name, size, key, url)
                                         VALUES ( $1, $2, $3, $4 )`;
    const values = [name, size, key, location];

    await pool.query(SQL, values);

    const { rows } = await pool.query('SELECT * FROM  permissao_usuarios WHERE key = $1', [key]);

    return res.status(200).json(rows);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
