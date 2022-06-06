import { StatusCodes } from 'http-status-codes';
import { ExceptionCodes } from '../enums';

export default class ExceptionsUtils extends Error {
  statusCode: number
  status: number
  message: string

  constructor(exceptionCode: ExceptionCodes) {
    const mappedExceptions = {
      [ExceptionCodes.EMAIL_ALREADY_REGISTERED]: { statusCode: StatusCodes.CONFLICT, message: 'Não foi possível cadastrar este E-MAIL, ele está sendo utilizado por outro usúario.' },
      [ExceptionCodes.USERNAME_ALREADY_REGISTERED]: { statusCode: StatusCodes.CONFLICT, message: 'Não foi possível cadastrar este USERNAME, ele está sendo utilizado por outro usúario.' }
    }

    super(mappedExceptions[exceptionCode].message ?? 'Exception not mapped.')
    this.statusCode = mappedExceptions[exceptionCode].statusCode
    this.status = exceptionCode
    this.message = mappedExceptions[exceptionCode].message
  }

  toString(): string { return this.message }
}