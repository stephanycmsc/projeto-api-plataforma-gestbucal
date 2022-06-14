import { StatusCodes } from 'http-status-codes';
import { ExceptionCodesEnum } from '../enums';

export default class ExceptionsUtils extends Error {
  statusCode: number
  status: number
  message: string
  detail: string

  constructor(exceptionCode: ExceptionCodesEnum, message?: string) {
    const mappedExceptions = { [ExceptionCodesEnum.INVALID_REQUEST_PARAMS]: { statusCode: StatusCodes.BAD_REQUEST, message: message } }

    super(mappedExceptions[exceptionCode].message ?? 'Exception not mapped.')
    this.statusCode = mappedExceptions[exceptionCode].statusCode
    this.status = exceptionCode
    this.message = mappedExceptions[exceptionCode].message
  }

  toString(): string { return this.message }
}