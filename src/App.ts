require('dotenv/config')
import express from 'express'
import Routes from './Routes'
import ErrorMiddleware from './middlewares/ErrorMiddleware'
import { createConnection } from 'typeorm'
import { PORT } from './utils/EnvUtils'

export default class App {
  private routes = new Routes()
  private errorMiddleware = new ErrorMiddleware()
  public app: express.Application

  public constructor() {
    this.app = express()
    this.app.use(express.json({ limit: '50mb' }))
  }

  public startApp() {
    createConnection().then(async connection => {
      this.app.use(this.routes.registerControllers())
      this.app.use(this.errorMiddleware.mapError)
      this.app.all('/', (_, res) => { res.send(`Server is running!`) })
      this.app.listen(PORT, () => { console.log(`Server running in port: ${PORT}`) })
    }).catch((err) => console.error(`Connection with database failed: ${err}`))
  }
}