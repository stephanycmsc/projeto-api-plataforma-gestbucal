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
      .notEmpty()
      .withMessage(MessageEnum.MANDATORY_FIELD)
      .isAlphanumeric()
      .withMessage(MessageEnum.ONLY_ALFA_NUMERIC)
      .isLength({ max: this.usernameMaxLength })
      .withMessage(`${MessageEnum.MAX_CHARACTER_LENGTH}: ${this.usernameMaxLength}`),
    body('email')
      .notEmpty()
      .withMessage(MessageEnum.MANDATORY_FIELD)
      .isEmail()
      .withMessage(MessageEnum.NOT_AN_EMAIL)
      .isLength({ max: this.emailMaxLength })
      .withMessage(`${MessageEnum.MAX_CHARACTER_LENGTH}: ${this.emailMaxLength}`),
    body('password')
      .notEmpty()
      .withMessage(MessageEnum.MANDATORY_FIELD)
      .custom(value => this.validatorUtils.isLength(value, this.passwordMinLength, this.passwordMaxLength))
  ]
}