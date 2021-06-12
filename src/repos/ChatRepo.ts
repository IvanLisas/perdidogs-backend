import { EntityRepository, Repository } from 'typeorm'
import { Chat } from '../models/Chat'

@EntityRepository(Chat)
class ChatRepo extends Repository<Chat> {}

const chatRepo = new ChatRepo()

export default chatRepo
