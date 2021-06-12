import { Router } from 'express'
//import {holaMundo} from '../controllers/TestController'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json()
})
routes.get('/hola', ()=>{
  return "hola"
});

export default routes
