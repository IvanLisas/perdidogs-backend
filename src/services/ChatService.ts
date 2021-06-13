import chatRepo from '../repos/ChatRepo'
import { Chat } from '../models/Chat'

export class ChatService {
  async getAllChats(id: number): Promise<Chat[] | undefined> {
    try {
      return await chatRepo.find({ user1: { userId: id } })
    } catch (error) {
      throw 'Error al recuperar el mensaje'
    }
  }

  async saveChat(chat: Chat): Promise<Chat> {
    try {
      return await chatRepo.save(chat)
    } catch (error) {
      throw 'Error al recuperar el mensaje'
    }
  }
}

const chatService = new ChatService()

export default chatService
