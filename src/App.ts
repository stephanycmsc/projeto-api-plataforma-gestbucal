require('dotenv/config')
import express from 'express'
import { createConnection } from 'typeorm'
import { router } from './routes'

export default class App {
    private port = process.env.PORT
    public app: express.Application

    public constructor () {
        this.app = express()
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
}