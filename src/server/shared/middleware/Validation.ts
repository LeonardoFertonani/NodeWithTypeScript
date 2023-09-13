import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';
type TGetSchema = <T>(schema: yup.Schema<T>) => yup.Schema<T>;
type TAllSchemas = Record<TProperty, yup.Schema<any>>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async(req, res, next) => {
  const schemas = getAllSchemas(schema => schema);

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach( ([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], {abortEarly: false});
    } 
    catch (e) {
      const yupError = e as yup.ValidationError;
      const errors: Record<string, string> = {};
      yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
      });
      
      errorsResult[key] = errors;
    } 
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errorsResult });
  }
};
