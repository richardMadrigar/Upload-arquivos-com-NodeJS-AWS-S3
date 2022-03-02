import { Request, Response } from 'express';
import logger from '../config/configLogger';

export const upload = async (req: Request, res: Response) => {
  logger.info(req.file);

  try {
    return res.status(200).json('Upload no diretorio OK');
  } catch (error) {
    return res.status(500).json('Internal Server error');
  }
};
