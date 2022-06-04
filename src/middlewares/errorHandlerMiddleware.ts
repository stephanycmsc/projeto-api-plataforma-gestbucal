import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypeORMError } from 'typeorm';
import { Exception, ExceptionCodes } from '../types/Exceptions';

const debug = true;

// errorHandlerMiddleware verifica as exceptions mapeadas no ExceptionCodes para enviar o status http correto
export default function errorHandlerMiddleware(
  err: unknown,
  _: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = StatusCodes.FORBIDDEN;
  let code = 0;
  let subMessage: undefined | string;

  if (err instanceof Exception) {
    code = err.code;
    statusCode = err.statusCode;
    subMessage = err.subMessage;
  } else if (err instanceof TypeORMError) {
    code = ExceptionCodes.DatabaseError;
  }
  res.status(statusCode).json({
    code,
    message: String(err),
    subMessage,
    stack: debug ? (err as Error).stack : undefined,
  });
}
