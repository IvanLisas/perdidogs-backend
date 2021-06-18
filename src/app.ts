import express from 'express'
import { createConnection } from 'typeorm'
import chatRoutes from './routes/ChatRoutes'
import userRoutes from './routes/UserRoutes'
import postRoutes from './routes/PostRoutes'
import bootstrap from './bootstrap/Bootstrap'
//Tirar este query del ojete en el sql
//ALTER USER 'root'@'localhost' idENTIFIED WITH mysql_native_password BY '1234'

const app = express() //Creo la conexion con express
app.set('port', process.env.PORT || 3001) // Defino el puerto
app.use(express.json())
console.log('Creando tablas...')
createConnection()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(async (connection) => {
    console.log(connection.name)
    console.log('Conexion establesida, creando datos del bootstrap...')
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
