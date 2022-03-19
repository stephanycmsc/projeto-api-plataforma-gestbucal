import UserController from "./controller/UserController";
import { Router } from 'express'

const router = Router()

new UserController().setRoutes(router)

export { router }