import {getRepository} from "typeorm";
import {Request, Response, Router} from "express";
import {Users} from "../entity/Users";

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
        const userRepo = getRepository(Users)

        const result = userRepo.save({
            id: 1,  /** Quando define o ID faz um UPDATE, sem o ID faz um CREATE */
            age: 20,
            firstName: 'Steph02',
            lastName: 'Carvalho'
        })

        return res.json({
            status: 0,
            data: null,
            message: 'Created'
        })
    }

    setRoutes(router: Router) {
        router.get('/users', this.getUsers)
        router.post('/users', this.addUser)
    }
}