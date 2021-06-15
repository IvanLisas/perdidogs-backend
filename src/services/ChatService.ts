import { Chat } from '../models/Chat'
import { getRepository } from 'typeorm'

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
}

const chatService = new ChatService()

export default chatService
