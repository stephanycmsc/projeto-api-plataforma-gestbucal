import { StatusCodes } from 'http-status-codes';

export enum ExceptionCodes {
  // Erros relacionados a autenticação
  LoginError = 110,
  JwtExpired = 111,
  JwtInvalid = 112,
  SessionExpired = 113,
  // Erros relacionados a validação de dados da requisição
  ValidationError = 120,
  // Erros relacionados a persistência de dados
  SaveError = 150,
  UpdateError = 151,
  DeleteError = 152,
  DatabaseError = 160,
}

// Mapa de relacionamento entre ExceptionCodes e mensagem + http status code
const exceptionCodeMessage = {
  [ExceptionCodes.LoginError]: {
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Não foi possível fazer login',
  },
  [ExceptionCodes.JwtExpired]: { statusCode: StatusCodes.UNAUTHORIZED, message: 'Acesso expirado' },
  [ExceptionCodes.JwtInvalid]: { statusCode: StatusCodes.UNAUTHORIZED, message: 'Acesso inválido' },
  [ExceptionCodes.SessionExpired]: {
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Sessão expirada',
  },
  [ExceptionCodes.ValidationError]: {
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Dados não passaram pela validação',
  },
  [ExceptionCodes.SaveError]: {
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Não foi possível gravar dados',
  },
  [ExceptionCodes.UpdateError]: {
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Não foi possível atualizar dados',
  },
  [ExceptionCodes.DeleteError]: {
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Não foi possível remover dados',
  },
  [ExceptionCodes.DatabaseError]: {
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Erro interno do database',
  },
};

// Exception define a classe que armazena o codigo do erro da api
export class Exception extends Error {
  code: number;

  statusCode: StatusCodes;

  subMessage?: string;

  toString(): string {
    return this.message;
  }

  constructor(code: ExceptionCodes, subMessage?: string) {
    super(exceptionCodeMessage[code].message ?? '<TODO: exception não mapeada>');
    this.code = code;
    this.statusCode = exceptionCodeMessage[code].statusCode;
    this.subMessage = subMessage;
  }
}

// Exceptions já instanciadas para simplificar o uso no throw
export const LoginException = new Exception(ExceptionCodes.LoginError);
export const JwtExpiredException = new Exception(ExceptionCodes.JwtExpired);
export const JwtInvalidException = new Exception(ExceptionCodes.JwtInvalid);
export const SessionExpiredException = new Exception(ExceptionCodes.SessionExpired);
export const ValidationException = new Exception(ExceptionCodes.ValidationError);
export const SaveException = new Exception(ExceptionCodes.SaveError);
export const UpdateException = new Exception(ExceptionCodes.UpdateError);
export const DeleteException = new Exception(ExceptionCodes.DeleteError);
