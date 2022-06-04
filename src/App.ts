require('dotenv/config')
import express from 'express'
import { createConnection } from 'typeorm'
import { PORT } from './utils/EnvUtils'
import { UserRegisterController } from '../src/modules/users/controllers/UserRegisterController'
import { ControllerTarget } from './decorators/types'
import collectRoutes from './helpers/collectRoutes'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware'

const controllerSet = new Set<ControllerTarget<unknown>>([UserRegisterController]);

export default class App {
  public app: express.Application

  public constructor() {
    this.app = express()
    this.app.use(express.json({ limit: '50mb' }))
  }

  public startApp() {
    createConnection().then(async connection => {
      this.app.use(collectRoutes(controllerSet));
      this.app.use(errorHandlerMiddleware);
      this.app.all('/', (_, res) => { res.send(`Server is running!`) })
      this.app.listen(PORT, () => { console.log(`Server running in port: ${PORT}`) })
    }).catch((err) => console.error(`Connection with database failed: ${err}`))
  }
}