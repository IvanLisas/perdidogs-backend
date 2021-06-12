import express from 'express'
import chatRoutes from './routes/chat.routes'
import { createConnection } from "typeorm";

class App {
  public server

  constructor() {
    this.server = express()

    this.middlewares()

    this.routes()

    createConnection();
  }

  
  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use([chatRoutes])
  }
}

export default new App().server
