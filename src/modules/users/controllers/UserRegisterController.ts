import UserRegisterService from "../services/UserRegisterService";
import UserAddressService from "../services/UserAddressService";
import { Response, Router } from "express";
import { TypedReq } from "../../../types";
import { CREATE_BODY } from "../contracts/UserRegisterContract";
import { StatusCodes } from "http-status-codes";

export default class UserRegisterController {
  private path = '/users'
  private userRegisterService = new UserRegisterService()
  private userAddressService = new UserAddressService()

  setRoutes(router: Router) { router.post(`${this.path}`, this.create) }

  create = async (req: TypedReq<any, CREATE_BODY>, res: Response) => {
    try {
      const userRegister = this.userRegisterService.createEntity(req.body)
      const userAddress = this.userAddressService.createEntity(req.body.address)

      userAddress.usersRegistersId = userRegister

      await this.userAddressService.create(userAddress)
      return res.sendStatus(StatusCodes.CREATED)
    } catch (error) {
      return res.json(typeof (error) === 'object' ? error.message : error)
    }
  }
}