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
    console.log(message)
    return res.json(await chatService.create(message))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

chatRoutes.get('/message/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    return res.json(await chatService.getMessage(id))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

chatRoutes.get('/:userid', async (req, res) => {
  const id = parseInt(req.params.userid)
  try {
    res.json(await chatService.get(id))
  } catch (error) {
    res.send(error.chat)
  }
})


chatRoutes.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    return res.json(await chatService.readChat(id))
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
