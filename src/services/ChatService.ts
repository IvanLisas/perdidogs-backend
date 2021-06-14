import chatRepo from '../repos/ChatRepo'
import { Chat } from '../models/Chat'

export class ChatService {
  async getAll(id: number): Promise<Chat[] | undefined> {
    try {
      return await chatRepo.find({ owner: { userId: id } })
    } catch (error) {
      throw error.message
    }
  }

  async save(chat: Chat): Promise<Chat> {
    try {
      return await chatRepo.save(chat)
    } catch (error) {
      throw error.message
    }
  }
}

const chatService = new ChatService()

export default chatService
