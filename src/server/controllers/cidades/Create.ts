import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade {
  name: string;
}
const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  name: yup.string().min(3).required()
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, {abortEarly: false});
    return next();
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
};

interface IFilter {
  filter?: string;
}
const queryValidation: yup.Schema<IFilter> = yup.object().shape({
  filter: yup.string().min(3),
});

export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try {
    await queryValidation.validate(req.query, {abortEarly: false});
    return next();
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
};

export const create: RequestHandler = async (req, res) => {
  return res.status(StatusCodes.CREATED).send(req.body.name);
};
