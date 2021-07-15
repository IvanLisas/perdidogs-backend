import { EntityRepository, getManager, Repository } from 'typeorm'
import { Count } from '../admin-module/models/Count';
import { QueryResult } from '../admin-module/models/QueryResult';
import { Pet } from '../models/Pet';
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

      static async filterPostByPetAlert(pet:Pet):Promise<QueryResult[]>{
        console.log("LLEGA AL POST REPO")
        const entityManager = getManager();
        const counts = await entityManager.query(
          `SELECT p.Id as alertOrPostId,p.locationId, pet.* FROM Post p 
          INNER JOIN pet  
          ON p.petId= petId
          WHERE pet.furId= `+ pet.fur +
          ' AND pet.breedId= '+ pet.breed +
          ' AND pet.hasCollar= '+ pet.hasCollar + 
          ' AND pet.sizeId= ' + pet.size)
        return counts
      }
}

