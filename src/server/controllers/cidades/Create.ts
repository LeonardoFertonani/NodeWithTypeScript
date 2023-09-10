import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade {
  name: string;
}
const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  name: yup.string().min(3).required()
});


export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = undefined;
  
  try {
    validatedData = await bodyValidation.validate(req.body, {abortEarly: false});
    return res.status(StatusCodes.CREATED).send('Create!');
  } 
  catch (e) {
    const yupError = e as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
}
