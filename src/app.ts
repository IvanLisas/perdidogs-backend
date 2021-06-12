import express from 'express'
import chatRoutes from './routes/chat.routes'

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
    this.server.use([chatRoutes])
  }
}

export default new App().server
