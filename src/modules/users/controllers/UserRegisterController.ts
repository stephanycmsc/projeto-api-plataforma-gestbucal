import UserRegisterService from "../services/UserRegisterService";
import UserAddressService from "../services/UserAddressService";
import argon2 from 'argon2'
import { Response, Router } from "express";
import { TypedReq } from "../../../types";
import { CREATE_BODY } from "../contracts/UserRegisterContract";
import { StatusCodes } from "http-status-codes";
import { ARGON2_SECRET } from '../../../utils/EnvUtils'
import { Controller, Post } from "../../../decorators";

@Controller('/user-registers')
export class UserRegisterController {
  private path = '/users'
  private userRegisterService = new UserRegisterService()
  private userAddressService = new UserAddressService()

  setRoutes(router: Router) { router.post(`${this.path}`, this.create) }

  @Post({ path: '/' })
  create = async (req: TypedReq<any, CREATE_BODY>, res: Response) => {
    const data = { ...req.body, password: await argon2.hash(`${req.body.password}${ARGON2_SECRET}`) }
    const userRegister = this.userRegisterService.createEntity(data)
    const userAddress = this.userAddressService.createEntity(req.body.address)

    userAddress.usersRegistersId = userRegister

    await this.userAddressService.create(userAddress)
  }
}