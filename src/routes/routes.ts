import { Router } from 'express'
import helloWorld from '../models/Test'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json(helloWorld())
})

export default routes