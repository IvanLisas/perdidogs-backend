import { Router } from 'express'
import chatService from '../services/ChatService'

const chatRoutes = Router()

chatRoutes.get('/:userid', async (req, res) => {
  try {
    const id = parseInt(req.params.userid)
    return res.json(chatService.getAll(id))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

chatRoutes.post('/', async (req, res) => {
  try {
    return res.json(chatService.save(req.body))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

export default chatRoutes
