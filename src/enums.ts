/**
 * Códigos de erros mapeados.
 * Não utilizar o valor <-1> pois este é o valor <default>.
 */
export enum ExceptionCodesEnum { INVALID_REQUEST_PARAMS = -4 }

export enum MessageEnum {
  MANDATORY_FIELD = 'Este campo é obrigatório',
  ONLY_ALFA_NUMERIC = 'Permitido apenas caracteres alfa-numéricos. Ex.: [a-zA-Z0-9_]',
  ONLY_NUMERIC = 'Permitido apenas caracteres numéricos. Ex.: [0-9]',
  NEED_BE_A_STRING = 'O valor inserido deve ser do tipo texto.',
  'NEED_BE_A_STRING?' = 'O valor inserido deve ser do tipo texto, vazio, nulo ou indefinido.',
  NEED_BE_A_JSON = 'O valor inserido deve ser do tipo JSON.',
  MAX_CHARACTER_LENGTH = 'Tamanho máximo de caracters',
  MIN_CHARACTER_LENGTH = 'Tamanho mínimo de caracters',
  INVALID_EMAIL = 'E-mail inválido.',
}
