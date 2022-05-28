import UsersAdresses from "../../../database/entities/UsersAdresses";
import UserAddressRepository from "../repositories/UserAddressRepository";

export default class UserAddressService {
  private userAddressRepo = new UserAddressRepository()

  createEntity = (data: any) => this.userAddressRepo.createEntity(data)

  create = async (data: UsersAdresses) => await this.userAddressRepo.create(data)
}