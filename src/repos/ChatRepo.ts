import { EntityRepository, getManager, Repository } from 'typeorm'
import { Chat } from '../models/Chat'

@EntityRepository(Chat)
export class ChatRepo extends Repository<Chat> {
}