import { body } from "express-validator";
import { MessageEnum } from '../../../enums'
import ValidatorUtils from "../../../utils/ValidatorUtils";

export default class UserRegisterValidator {
  private usernameMaxLength = 32
  private emailMaxLength = 32
  private passwordMaxLength = 16
  private passwordMinLength = 8
  private validatorUtils = new ValidatorUtils()

  createValidator = [
    body('username')
      .isString()
      .withMessage(MessageEnum.NEED_BE_A_STRING)
      .notEmpty()
      .withMessage(MessageEnum.MANDATORY_FIELD)
      .isAlphanumeric()
      .withMessage(MessageEnum.ONLY_ALFA_NUMERIC)
      .isLength({ max: this.usernameMaxLength })
      .withMessage(`${MessageEnum.MAX_CHARACTER_LENGTH}: ${this.usernameMaxLength}`),
    body('email')
      .isString()
      .withMessage(MessageEnum.NEED_BE_A_STRING)
      .notEmpty()
      .withMessage(MessageEnum.MANDATORY_FIELD)
      .isEmail()
      .withMessage(MessageEnum.INVALID_EMAIL)
      .isLength({ max: this.emailMaxLength })
      .withMessage(`${MessageEnum.MAX_CHARACTER_LENGTH}: ${this.emailMaxLength}`),
    body('password')
      .isString()
      .withMessage(MessageEnum.NEED_BE_A_STRING)
      .notEmpty()
      .withMessage(MessageEnum.MANDATORY_FIELD)
      .custom(value => this.validatorUtils.isLength(value, this.passwordMinLength, this.passwordMaxLength)),
    body('typeId')
      .isNumeric()
      .withMessage(MessageEnum.ONLY_NUMERIC),
    body('address.zipcode')
      .isString()
      .withMessage(MessageEnum.NEED_BE_A_STRING)
      .custom(value => this.validatorUtils.zipcodeValidator(value)),
    body('address.street')
      .isString()
      .withMessage(MessageEnum.NEED_BE_A_STRING)
      .notEmpty()
      .withMessage(MessageEnum.MANDATORY_FIELD),
    body('address.city')
      .isString()
      .withMessage(MessageEnum.NEED_BE_A_STRING)
      .notEmpty()
      .withMessage(MessageEnum.MANDATORY_FIELD),
    body('address.district')
      .isString()
      .withMessage(MessageEnum.NEED_BE_A_STRING)
      .notEmpty()
      .withMessage(MessageEnum.MANDATORY_FIELD),
    body('address.complement')
      .custom(value => typeof value === 'string' || !value)
      .withMessage(MessageEnum['NEED_BE_A_STRING?']),
    body('jsonData')
      .custom(value => value && typeof value === 'object' && !Array.isArray(value))
      .withMessage(MessageEnum.NEED_BE_A_JSON)
  ]
}