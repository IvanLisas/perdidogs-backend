import { Router } from 'express'
import { User } from '../models/User'
import userService from '../services/UserService'

const userRoutes = Router()

userRoutes.put('/login', async (req, res) => {
  try {
    res.json(await userService.login(req.body.email, req.body.password))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

userRoutes.get('/:userid', async (req, res) => {
  const id = parseInt(req.params.userid)
  try {
    res.json(await userService.get(id))
  } catch (error) {
    res.send(error.message)
  }
})

userRoutes.post('/', async (req, res) => {
  try {
    const user = User.fromJson(req.body)
    res.json(await userService.create(user))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

userRoutes.put('/', async (req, res) => {
  try {
    return res.json(await userService.update(req.body))
  } catch (error) {
    res.send(error.message)
  }
})

userRoutes.delete('/:userid', async (req, res) => {
  try {
    const id = parseInt(req.params.userid)
    const user = await userService.get(id)
    return res.json(userService.delete(user))
  } catch (error) {
    res.send(error.message)
  }
})

export default userRoutes
