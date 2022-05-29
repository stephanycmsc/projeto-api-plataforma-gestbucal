require('dotenv/config')
import express, {
  NextFunction,
  Request,
  Response
} from 'express'
import { createConnection } from 'typeorm'
import { PORT } from './utils/EnvUtils'

export default class App {
  public app: express.Application

  public constructor() {
    this.app = express()
    this.app.use(express.json({ limit: '50mb' }))
  }

  public startApp() {
    createConnection().then(async connection => {
      this.app.use((await import('./routes')).router)
      this.app.use(this.formatResponse)
      this.app.all('/', (_, res) => { res.send(`Server is running!`) })
      this.app.listen(PORT, () => { console.log(`Server running in port: ${PORT}`) })
    }).catch((err) => console.error(`Connection with database failed: ${err}`))
  }

  private formatResponse(_: Request, res: Response, next: NextFunction) {
    try {
      const jsonOrig = res.json
      const replaceJson = (body: any): any => {
        res.json = jsonOrig
        if (typeof body === 'object') {
          res.json({ status: 0, message: null, data: body })
        } else {
          res.json({ status: -1, message: body, data: null })
        }
      }

      res.json = replaceJson
      next()
    } catch (e) {
      console.log(e)
      res.json({
        status: -1,
        message: 'erro no app ' + (typeof (e) === 'string' ? e : e.message),
        data: null
      })
    }
  }
}