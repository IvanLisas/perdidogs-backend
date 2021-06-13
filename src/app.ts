import express, { Request, Response } from 'express'
import { createConnection } from 'typeorm'

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'
//Tirar este query del ojete en el sql
class Server {
  private app: express.Application

  constructor() {
    this.app = express() // init the application
    this.configuration()
    this.routes()
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 3001)
    this.app.use(express.json())
  }

  /**
   * Method to configure the routes
   */
  public async routes() {
    await createConnection()

    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello world!')
    })
  }

  /**
   * Used to start the server
   */
  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`)
    })
  }
}

const server = new Server() // Create server instance
server.start() // Execute the server
