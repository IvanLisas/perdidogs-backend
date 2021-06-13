import { Router } from 'express'
import chatService from '../services/ChatService'

const chatRoutes = Router()

chatRoutes.get('/', (req, res) => {
  return res.send('Estos son los chats')
})

chatRoutes.get('/getMyChats/:userId', (req, res) => {
  const id = parseInt(req.params.userId)
  return res.json(chatService.getAllChats(id))
})

chatRoutes.put('/sendMessage', (req, res) => {
  console.log(req, res)
  return res.json(chatService.saveChat(req.body))
})

export default chatRoutes
