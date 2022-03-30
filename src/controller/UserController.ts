import {getRepository} from "typeorm";
import {Request, Response, Router} from "express";
import {Users} from "../entity/Users";
import moment from "moment";

export default class UserController {
    getUsers = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userRepo = getRepository(Users)

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
                message: typeof(error) === 'string' ? error : error.message
            })
        }

    }

    addUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userRepo = getRepository(Users)
            const result = await userRepo.save({
                age: req.body.age,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            })

            return res.json(result)
        } catch (error) {
            return res.json(typeof(error) === 'object' ? error.message : error)//NATHAN
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userRepo = getRepository(Users)
            const result = await userRepo.delete({ id: 6 }) //params

            return res.json({})
        } catch (error) {
            return res.json(typeof(error) === 'object' ? error.message : error)//NATHAN
        }
    }

    setRoutes(router: Router) {
        router.get('/users', this.getUsers)
        router.post('/users', this.addUser)
        router.delete('/users', this.deleteUser)
    }
}