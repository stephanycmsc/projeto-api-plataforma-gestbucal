require('dotenv/config')
import express from 'express'
import { createConnection } from 'typeorm'

export default class App {
    private port: string = process.env.PORT
    public app: express.Application

    public constructor () {
        this.app = express()
    }

    public startApp () {
        createConnection().then(async connection => {})
        this.app.listen(this.port, () => { console.log(`Server running in port: ${this.port}`) })
    }
}