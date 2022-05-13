import * as express from "express"
import { getRepository } from "typeorm";
import { Request, Response, Router } from "express";
import { UsersTypes } from "../database/entities/UsersTypes";

export default class UserController {
  getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userRepo = getRepository(UsersTypes)

      /////// throw new Error('Erro forçado')


      return res.json({
        status: 0,
        data: await userRepo.findAndCount(),
        message: ''
      })
    } catch (error) {
      return res.json({
        status: 1,
        data: null,
        message: typeof (error) === 'string' ? error : error.message
      })
    }

  }

  addUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userRepo = getRepository(UsersTypes)
      // const result = await userRepo.save({
      //   firstName: req.body.firstName,
      //   lastName: req.body.lastName
      // })

      return res.json()
    } catch (error) {
      return res.json(typeof (error) === 'object' ? error.message : error)//NATHAN
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userRepo = getRepository(UsersTypes)
      const result = await userRepo.delete({ id: 6 }) //params

      return res.json({})
    } catch (error) {
      return res.json(typeof (error) === 'object' ? error.message : error)//NATHAN
    }
  }

  update = async (req: Request, res: Response) => {
    const userRepo = await getRepository(UsersTypes).findOne(req.params.id)
    getRepository(UsersTypes).merge(userRepo, req.body)
  }


  setRoutes(router: Router) {
    router.get('/users', this.getUsers)
    router.post('/users', this.addUser)
    router.delete('/users', this.deleteUser)
  }
}