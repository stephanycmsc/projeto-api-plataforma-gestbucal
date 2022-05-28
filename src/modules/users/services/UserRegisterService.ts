import UserRegisterRepository from "../repositories/UserRegisterRepository";

export default class UserRegisterService {
  private userRegisterRepo = new UserRegisterRepository()

  createEntity = (data: any) => this.userRegisterRepo.createEntity(data)
}