require('dotenv/config')
import express, { NextFunction, Request, Response } from 'express'
import { createConnection } from 'typeorm'
import { router } from './routes'

export default class App {
    private port = process.env.PORT
    public app: express.Application

    public constructor () {
        this.app = express()
        this.app.use(express.json({ limit: '50mb' }))//NATHAN
        this.app.use(this.formatResponse)//NATHAN
        this.setRoutes()
    }

    public startApp () {
        createConnection().then(async connection => {})
        this.app.listen(this.port, () => { console.log(`Server running in port: ${this.port}`) })
    }

    private setRoutes () {
        this.app.use(router)
        this.app.all('/', (req, res) => { res.send(`Server is running!`) })
    }

    private formatResponse (req: Request, res: Response, next: NextFunction) {
        try {
            const jsonOrig = res.json
            const replaceJson = (body: any): any => {
                res.json = jsonOrig
                if(typeof body === 'object')  {
                    res.json({status:0, message: null, data: body})
                } else {
                    res.json({status:-1, message: body, data:null})
                }
            }

            res.json = replaceJson
            next()
        } catch(e) {
            console.log(e)
            res.json({
                status:-1,
                message:'erro no app ' + (typeof(e) === 'string' ? e : e.message),
                data:null
            })
        }
    }
}