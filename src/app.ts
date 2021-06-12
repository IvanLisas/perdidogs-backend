import express from 'express'
import routes from './routes/routes'
import "reflect-metadata";
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
    this.server.use([routes])
  }
}

export default new App().server
