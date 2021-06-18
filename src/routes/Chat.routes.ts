import { Router } from 'express'
import chatService from '../services/ChatService'

const chatRoutes = Router()

chatRoutes.get('/:userid', async (req, res) => {
  try {
    const id = parseInt(req.params.userid)
    return res.json(await chatService.getAll(id))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

chatRoutes.post('/', async (req, res) => {
  try {
    const message = new MessageDTO(req.body.chat, req.body.sender, req.body.adressee, req.body.messageBody, req.body.read)
    return res.json(await chatService.create(message))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

export default chatRoutes

export class MessageDTO {
  sender: number
  chat: number
  adressee: number
  messageBody: string
  read: boolean

  constructor(chat: number, sender: number, adressee: number, messageBody: string, read: boolean) {
    this.chat = chat
    this.sender = sender
    this.adressee = adressee
    this.messageBody = messageBody
    this.read = read
  }
}
