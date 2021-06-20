import { Chat } from '../models/Chat'
import { getRepository } from 'typeorm'
import userService from './UserService'
import { Message } from '../models/Message'
import { MessageDTO } from '../routes/ChatRoutes'
import { read } from 'fs'

export class ChatService {
  async getAll(id: number): Promise<Chat[]> {
    return await getRepository(Chat).find({ relations: ['owner', 'owner2', 'messageList'], where: [{ owner: { Id: id } }, { owner2: { Id: id } }] })
  }

  async getMessage(id: number): Promise<Message | undefined> {
    return await getRepository(Message).findOne({Id: id})
  }

  async create(message: MessageDTO): Promise<Chat | undefined> {
    const user1 = await userService.get(message.sender)
    const user2 = await userService.get(message.adressee)
    const msg = new Message({ sender: user1, adressee: user2, messageBody: message.messageBody })
    await getRepository(Message).save(msg)
    if (message.chat == 0) {
      const chat = new Chat({ owner: user1, owner2: user2, messageList: [msg] })
      return await getRepository(Chat).save(chat)
    } else {
      const chat = await getRepository(Chat).findOneOrFail(message.chat, { relations: ['messageList'] })
      chat.messageList.push(msg)
      return await getRepository(Chat).save(chat)
    }
  }

  async readChat(id: number): Promise<Chat> {
    const chat = await getRepository(Chat).findOneOrFail({Id: id}, { relations: ['messageList']}) as Chat
    chat.messageList.every(x => x.read = true)
    return await getRepository(Chat).save(chat)
  }

}

const chatService = new ChatService()

export default chatService
