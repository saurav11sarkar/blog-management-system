import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import config from '../config';
import handleGenericError from '../helpers/handleGenericError';
import handleValidationError from '../helpers/handleValidationError';
import handleZodError from '../helpers/handleZodError';
import handleDuplectError from '../helpers/handleDuplectError';
import handleCastError from '../helpers/handleCastError';

type TErrorResponse = {
  success: boolean;
  message: string;
  error: any;
};

export const globalErrorHandler = (
  err: TErrorResponse | any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplectError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.name === 'ZodError') {
    handleZodError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }

  res.status(500).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack === config.nodeEnv ? err.stack : '🤡',
  });
};

export default globalErrorHandler;
