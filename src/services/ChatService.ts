import chatRepo from '../repos/ChatRepo'
import { Chat } from '../models/Chat'

export class ChatService {
  async getAllChats(): Promise<Chat[]> {
    try {
      return await chatRepo.find()
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
