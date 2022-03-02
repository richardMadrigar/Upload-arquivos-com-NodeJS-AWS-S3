import { Request, Response } from 'express';
import { pool } from '../config/configDataBase/database';
import logger from '../config/configLogger';

export const upload = async (req: Request, res: Response) => {
  const result = req.file;

  if (!result) return res.status(400).json({ message: 'nao tem conteudo' });

  const { originalname: name, size, filename: key } = result;
  const url = '';

  try {
    const SQL = `INSERT INTO permissao_usuarios ( name, size, key, url)
                                         VALUES ( $1, $2, $3, $4 )`;

    const values = [name, size, key, url];

    await pool.query(SQL, values);

    logger.info('Foto guardada no BD com sucesso');
    return res.status(200).json('Upload no diretorio OK');
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
