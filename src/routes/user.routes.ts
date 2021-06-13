import { Router } from 'express'
import userService from '../services/UserService'

const userRoutes = Router()
userRoutes.get('/:userId', async (req, res) => {
  const id = parseInt(req.params.userId)
  try {
    res.json(await userService.get(id))
  } catch (error) {
    res.send(error.message)
  }
})

userRoutes.post('/', async (req, res) => {
  try {
    return res.json(await userService.save(req.body))
  } catch (error) {
    res.send(error.message)
  }
})

userRoutes.delete('/:userId', async (req, res) => {
  try {
    const id = parseInt(req.params.userId)
    const user = await userService.get(id)
    return res.json(userService.delete(user))
  } catch (error) {
    res.send(error.message)
  }
})

export default userRoutes
