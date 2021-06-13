import express, { Request, Response } from 'express'
import { createConnection } from 'typeorm'
import chatRoutes from './routes/chat.routes'
//Tirar este query del ojete en el sql
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'
class Server {
  private app: express.Application

  constructor() {
    this.app = express() // init the application
    this.configuration()
    this.routes()
  }

  /* If we didn't configure the port into the environment
  variables it takes the default port 3000 */
  public configuration() {
    this.app.set('port', process.env.PORT || 3001)
    this.app.use(express.json())
  }

  //Method to configure the routes
  public async routes() {
    await createConnection()
    this.app.use('/chat', chatRoutes)
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Aplicacion Perdidogs')
    })
  }

  //Used to start the server
  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`)
    })
  }
}

const server = new Server() // Create server instance
server.start() // Execute the server
