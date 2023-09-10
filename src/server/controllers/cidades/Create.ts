import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ICidade {
  name: string;
}

export const create = (req: Request<{}, {}, ICidade>, res: Response) => {0
  console.log(req.body);

  return res.status(StatusCodes.CREATED).send('Create!');
}
