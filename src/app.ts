import express, { Request, Response } from 'express'
import { createConnection } from 'typeorm'
import { Alert } from './models/Alert'
import { Breed } from './models/Breed'
import { Fur } from './models/Fur'
import { Color } from './models/FurColor'
import { Length } from './models/Length'
import { Location } from './models/Location'
import { Pet } from './models/Pet'
import { Picture } from './models/Picture'
import { Post } from './models/Post'
import { PostStatus } from './models/PostStatus'
import { Rol } from './models/Rol'
import { Size } from './models/Size'
import { User } from './models/User'
import { UserStatus } from './models/UserStatus'
import chatRoutes from './routes/chat.routes'
import userRoutes from './routes/user.routes'
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
    try {
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'perdidogs',
        entities: [User, Alert, Rol,UserStatus,Fur, Color, Length, Pet,Size,Breed, PostStatus, Picture, Post,Location],
        synchronize: true,
        logging: false
      })
        .then((connection) => {
          // here you can start to work with your entities
        })
        .catch((error) => console.log(error))
    } catch (error) {
      console.log(error.message)
    }
    this.app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE') // allow these verbs
      res.header('Access-Control-Allow-Headers', '*')
      next()
    })
    this.app.use('/user', userRoutes)
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
