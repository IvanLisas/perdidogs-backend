import { Router } from 'express'
import helloWorld from '../domain/Test'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json(helloWorld())
})

export default routes