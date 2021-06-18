import express from 'express'
import { createConnection } from 'typeorm'
import chatRoutes from './routes/ChatRoutes'
import userRoutes from './routes/UserRoutes'
import postRoutes from './routes/PostRoutes'
import bootstrap from './bootstrap/Bootstrap'
import { Alert } from './models/Alert'
import { Breed } from './models/Breed'
import { Chat } from './models/Chat'
import { Color } from './models/Color'
import { Fur } from './models/Fur'
import { Length } from './models/Length'
import { Location } from './models/Location'
import { Message } from './models/Message'
import { Pet } from './models/Pet'
import { Picture } from './models/Picture'
import { Post } from './models/Post'
import { Rol } from './models/Rol'
import { Size } from './models/Size'
import { User } from './models/User'
//Tirar este query del ojete en el sql
//ALTER USER 'root'@'localhost' idENTIFIED WITH mysql_native_password BY '1234'

const app = express() //Creo la conexion con express
app.set('port', process.env.PORT || 3001) // Defino el puerto
app.use(express.json())
console.log('Creando tablas...')
createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'perdidogs',
  entities: [User, Alert, Chat, Rol, Message, Fur, Color, Length, Pet, Size, Breed, Picture, Post, Location],
  synchronize: true,
  logging: false, 
  dropSchema:true
})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(async (connection) => {
    console.log('Conexion establecida, creando datos del bootstrap...')
    await bootstrap.run()
    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      res.header('Access-Control-Allow-Headers', '*')
      next()
    })
    //Routes
    app.use('/user', userRoutes)
    app.use('/chat', chatRoutes)
    app.use('/post', postRoutes)
    app.get('/', (req, res) => {
      res.send('Aplicacion Perdidogs')
    })

    app.listen(app.get('port'), () => {
      console.log(`El servidos estar escuchando en el puerto ${app.get('port')} port.`)
    })
  })
  .catch((error) => {
    console.log('--------------------------------------------------------Error---------------------------------------------------------------------')
    console.log(error)
    console.log('No se pudieron crean los datos, la conexion no se pudo establecer')
    console.log('Error: ' + error.message + '. Ver mas arriba los detalles')
  })
