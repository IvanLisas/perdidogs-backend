import { EntityRepository, getManager, Repository } from 'typeorm'
import { Count } from '../admin-module/models/Count';
import { Post } from '../models/Post'
 
@EntityRepository(Post)
export class PostRepo extends Repository<Post> {

    static async countLostBreeds():Promise<Count[]>{
        const entityManager = getManager();
        const counts = await entityManager.query(`SELECT COUNT(b.Id) as count, b.Id, b.description from post p
        INNER JOIN pet 
        on p.petId= pet.id
        INNER JOIN breed b
        on pet.breedId = b.id
        group by b.Id`);
        return counts
      }
}

