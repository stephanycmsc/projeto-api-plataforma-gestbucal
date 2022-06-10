import UserRegisterService from "../services/UserRegisterService";
import UserAddressService from "../services/UserAddressService";
import UserRegisterValidator from "../validators/UserRegisterValidator";
import argon2 from 'argon2'
import { CREATE_BODY } from "../contracts/UserRegisterContract";
import { ARGON2_SECRET } from '../../../utils/EnvUtils'
import { TypedReq } from "../../../interfaces";
import { Controller, Post } from "../../../decorators";

@Controller('/user-registers')
export class UserRegisterController {
  private userRegisterService = new UserRegisterService()
  private userAddressService = new UserAddressService()

  @Post({
    path: '/',
    validator: new UserRegisterValidator().createValidator
  })
  create = async (req: TypedReq<any, CREATE_BODY>) => {
    const data = { ...req.body, password: await argon2.hash(`${req.body.password}${ARGON2_SECRET}`) }
    const userRegister = this.userRegisterService.createEntity(data)
    const userAddress = this.userAddressService.createEntity(req.body.address)

    userAddress.usersRegistersId = userRegister

    await this.userAddressService.create(userAddress)
  }
}