import { EntityRepository, getManager, Repository } from 'typeorm'
import { Count } from '../admin-module/models/Count';
import { QueryResult } from '../admin-module/models/QueryResult';
import { NotificationDTO } from '../models/NotificationDTO';
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
          WHERE pet.furLength= `+ pet.furLength +
          ' AND pet.colorId= '+ pet.color.Id +
          ' AND pet.breedId= '+ pet.breed +
          ' AND pet.hasCollar= '+ pet.hasCollar + 
          ' AND pet.sizeId= ' + pet.size)
        return counts
      }

      static async getPostsByUserId(userId:number):Promise<NotificationDTO[]>{
        console.log("LLEGA AL getAlertsByUserId() ")
        const entityManager = getManager();
        return  await entityManager.query('SELECT DISTINCT p.*, n.alertId, n.postId FROM  perdidogs.user u INNER JOIN post p '+
        ' ON p.ownerId = u.Id '+
        ' INNER JOIN notifications n '+
        ' ON n.postId = p.Id '+
        ' inner join alert a '+
        ' on a.Id= n.alertId '+
        ' AND n.hasBeenRejected= false' +
        ' AND p.ownerId!= '+userId +
        ' AND a.ownerId= '+userId);
      }
}

