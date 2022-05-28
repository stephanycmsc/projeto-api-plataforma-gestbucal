import UserController from "./modules/users/controllers/UserRegisterController";
import { Router } from 'express'

const router = Router()

new UserController().setRoutes(router)

export { router }