import { EntityRepository, getManager, Repository } from 'typeorm'
import { Chat } from '../models/Chat'

@EntityRepository(Chat)
export class ChatRepo extends Repository<Chat> {
    static async getByOwnerId():Promise<Chat[]>{
        const entityManager = getManager();
        const counts = await entityManager.query(`select  c.*,m.* from perdidogs.chat c
        inner join perdidogs.message m
        on m.chatId= c.id
        where (c.ownerId=3 OR c.owner2Id=3)
        order by m.creationDate desc`);
        return counts
      }


}