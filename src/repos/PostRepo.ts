import { EntityRepository, getManager, Repository } from 'typeorm'
import { Count } from '../admin-module/models/Count'
import { QueryResult } from '../admin-module/models/QueryResult'
import { NotificationDTO } from '../models/NotificationDTO'
import { Pet } from '../models/Pet'
import { Post } from '../models/Post'

@EntityRepository(Post)
export class PostRepo extends Repository<Post> {
  static filterPostByPetAlertQuery = 'SELECT p.Id as alertOrPostId,p.locationId, pet.* FROM Post p INNER JOIN pet  ON p.petId= pet.Id'
  static async countLostBreeds(): Promise<Count[]> {
    const entityManager = getManager()
    const counts = await entityManager.query(`SELECT COUNT(b.Id) as count, b.Id, b.description from post p
        INNER JOIN pet 
        on p.petId= pet.id
        INNER JOIN breed b
        on pet.breedId = b.id
        group by b.Id`)
    return counts
  }

  static async filterPostByPetAlert(pet: Pet): Promise<QueryResult[]> {
    const entityManager = getManager()
    const query = PostRepo.filterPostByPetAlertQuery + buildWhereStatements(pet) + " order by creationDate DESC "
    console.log(query)
    const counts = await entityManager.query(query)
    return counts
  }

  static async getPostsByUserId(userId: number): Promise<NotificationDTO[]> {
    console.log('LLEGA AL getAlertsByUserId() ')
    const entityManager = getManager()
    const query =  'SELECT DISTINCT pic.postId, n.alertId, n.postId , pic.url, n.creationDate, l.lat, l.long '+  
    ' FROM  perdidogs.user u INNER JOIN post p ' +
    ' ON p.ownerId = u.Id ' +
    ' INNER JOIN notifications n ' +
    ' ON n.postId = p.Id ' +
    ' INNER JOIN location l  ' +
    ' ON p.locationId= l.Id ' +
    ' INNER JOIN picture pic'+
    ' ON pic.postId= p.Id ' +
    ' inner join alert a ' +
    ' on a.Id= n.alertId ' +
    ' AND n.hasBeenRejected= false' +
    ' AND p.ownerId!= ' +    userId +
    ' AND a.ownerId= ' +    userId
    console.log(query)
    return await entityManager.query(query    )
  }
}




function buildWhereStatements(pet: Pet): string {
  let query = ''
  if (pet.furLength != undefined) {
    if (query.length < 5) {
      query = query + ' WHERE'
    } else {
      query = query + ' AND '
    }
    query = query + ' pet.furLengthId= ' + pet.furLength.Id
  }
  if (pet.color !== undefined) {
    if (query.length < 5) {
      query = query + ' WHERE'
    } else {
      query = query + ' AND '
    }
    query = query + '  pet.colorId= ' + pet.color.Id
  }
  if (pet.breed !== undefined) {
    if (query.length < 5) {
      query = query + ' WHERE'
    } else {
      query = query + ' AND '
    }
    query = query + '  pet.breedId= ' + pet.breed.Id
  }
  if (pet.size !== undefined) {
    if (query.length < 5) {
      query = query + ' WHERE'
    } else {
      query = query + ' AND '
    }
    query = query + '  pet.sizeId= ' + pet.size.Id
  }
  return query
}
