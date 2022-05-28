import UsersAdresses from "../../../database/entities/UsersAdresses";
import { getRepository } from "typeorm";

export default class UserAddressRepository {
  private repo = getRepository(UsersAdresses)

  createEntity = (data: any) => this.repo.create(data as UsersAdresses)

  /** Cria o endereço do usuário. */
  create = async (data: UsersAdresses) => { return await this.repo.save(data) }
}