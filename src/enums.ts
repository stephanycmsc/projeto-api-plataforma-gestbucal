/**
 * Códigos de erros mapeados.
 * Não utilizar o valor <-1> pois este é o valor <default>.
 */
export enum ExceptionCodesEnum { INVALID_REQUEST_PARAMS = -4 }

export enum MessageEnum {
  MANDATORY_FIELD = 'Este campo é obrigatório',
  ONLY_ALFA_NUMERIC = 'Permitido apenas caracteres alfa-numérico!',
  MAX_CHARACTER_LENGTH = 'Tamanho máximo de caracters',
  MIN_CHARACTER_LENGTH = 'Tamanho mínimo de caracters',
  NOT_AN_EMAIL = 'Isso não é um email'
}
