export default class ValidatorUtils {
  zipcodeValidator = (zipcode: string) => /^[0-9]{5}-[0-9]{3}$/.test(zipcode)

  isLength(value: string, min?: number, max?: number) {
    let errors: string = undefined

    if ((max && value.length > max) || (min && value.length < min)) errors = `O número de caracteres deve ser entre ${min} e ${max}`
    if (errors) return Promise.reject(errors)

    return Promise.resolve()
  }
}