import {
  NextFunction,
  Request,
  Response
} from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypeORMError } from 'typeorm';
import {
  Exception,
  ExceptionCodes
} from '../types/Exceptions';
import { ENV } from '../utils/EnvUtils'

export default class ErrorMiddleware {
  mapError(err: unknown, _: Request, res: Response, next: NextFunction) {
    let statusCode = StatusCodes.FORBIDDEN
    let code = 0
    let subMessage: undefined | string

    if (err instanceof Exception) {
      code = err.code
      statusCode = err.statusCode
      subMessage = err.subMessage
    } else {
      if (err instanceof TypeORMError) code = ExceptionCodes.DatabaseError
    }

    res.status(statusCode).json({
      code,
      message: String(err),
      subMessage,
      stack: ENV === 'LOCAL' || ENV === 'DEV' ? (err as Error).stack : undefined
    })
  }
}