import { Router } from 'express'
import chatService from '../services/ChatService'

const chatRoutes = Router()

chatRoutes.get('/', (req, res) => {
  try {
    return res.send('Estos son los chats')
  } catch (error) {
    res.status(403).send(error.message)
  }
})

chatRoutes.get('/getMyChats/:userId', (req, res) => {
  try {
    const id = parseInt(req.params.userId)
    return res.json(chatService.getAll(id))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

chatRoutes.post('/', (req, res) => {
  try {
    return res.json(chatService.save(req.body))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

export default chatRoutes
