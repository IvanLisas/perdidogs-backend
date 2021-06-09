import express from 'express'

import routes from './routes/routes'
import hello2 from './routes/routes2'

class App {
  public server

  constructor() {
    this.server = express()

    this.middlewares()

    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use([routes, hello2])
  }
}

export default new App().server
