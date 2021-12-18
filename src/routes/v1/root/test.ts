import { Request, Response } from 'express';

module.exports = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).end('na');
};
