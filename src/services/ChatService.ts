import chatRepo from '../repos/ChatRepo'
import { Chat } from '../models/Chat'

export class ChatService {
  async getAll(id: number): Promise<Chat[] | undefined> {
    try {
<<<<<<< HEAD
      return await chatRepo.find({ owner: { userId: id } })
=======
      return await chatRepo.find({ user1: { Id: id } })
>>>>>>> 634a398f58d64643f75d4d1f0d2a7ecc1a6cc7eb
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
