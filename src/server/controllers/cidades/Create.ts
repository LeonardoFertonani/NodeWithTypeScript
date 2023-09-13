import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface ICidade {
  city: string,
  state: string
}
interface IFilter {
  filter?: string,
}
const createValidator = validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object().shape({
    city: yup.string().min(3).required(),
    state: yup.string().required()
  })),
  query: getSchema<IFilter>(yup.object().shape({
    filter: yup.string().min(3),
  })),
}));
const create: RequestHandler = async (req, res) => {
  return res.status(StatusCodes.CREATED).send('Created!');
};

export {createValidator, create};
