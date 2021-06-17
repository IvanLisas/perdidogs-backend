import { Chat } from '../models/Chat'
import { getRepository } from 'typeorm'
import { MessageDTO } from '../routes/ChatRoutes'
import userService from './UserService'
import { Message } from '../models/Message'

export class ChatService {
  async getAll(id: number): Promise<Chat[] | undefined> {
    try {
      return await getRepository(Chat).find({ owner: { Id: id } })
    } catch (error) {
      throw error.message
    }
  }

  async save(chat: Chat): Promise<Chat> {
    try {
      return await getRepository(Chat).save(chat)
    } catch (error) {
      throw error.message
    }
  }

  async create(message: MessageDTO): Promise<Chat | undefined> {
    const user1 = await userService.get(message.sender)
    const user2 = await userService.get(message.adressee)
    if (message.chat == 0) {
      const mesagge = new Message({ sender: user1, adressee: user2, body: message.messageBody })
      await getRepository(Message).save(mesagge)
      const chat = new Chat({ owner: user1, owner2: user2, messageList: [mesagge] })

      return await getRepository(Chat).save(chat)
    } else {
      /*   const users = await getRepository(Chat).find({ relations: ["photos"] }); */
      const chat = await getRepository(Chat).findOneOrFail(message.chat, { relations: ['messageList'] })
      const mesagge = new Message({ sender: user1, adressee: user2, body: message.messageBody })
      await getRepository(Message).save(mesagge)
      chat.messageList.push(mesagge)

      return await getRepository(Chat).save(chat)
    }
  }
}

const chatService = new ChatService()

export default chatService
