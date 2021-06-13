import { Router } from 'express'
import userService from '../services/UserService'
import { User } from '../models/User'

const userRoutes = Router()
userRoutes.get('/getUser/:userId', (req, res) => {
  const id = parseInt(req.params.userId)
  return res.json(userService.getUser(id))
})

userRoutes.post('/', (req, res) => {
  return res.json(userService.saveUser(req.body))
})

userRoutes.delete('/deleteUser', (req, res) => {
  return res.json(userService.saveUser(req.body))
})

//Cosa de prueba-- Borrar desp
userRoutes.get('/', (req, res) => {
  const user = new User({ userId: 1, name: 'USUARIO1' })
  return res.json(user)
})

export default userRoutes
