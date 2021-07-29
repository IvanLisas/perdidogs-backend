import { EntityRepository, getManager, Repository } from 'typeorm'
import { Count } from '../admin-module/models/Count'
import { QueryResult } from '../admin-module/models/QueryResult'
import { StatsFilter } from '../admin-module/models/StatsFilter'
import { Alert } from '../models/Alert'
import { Pet } from '../models/Pet'

@EntityRepository(Alert)
export class AlertRepo extends Repository<Alert> {
  static filterAlertsByPetInPostQuery = 'SELECT a.Id as alertOrPostId,a.locationId, pet.* FROM Alert a INNER JOIN pet ON a.petId= pet.Id'

  static async countAlertLostBreeds(filter: StatsFilter) : Promise<Count[]>{
      let where = ''
      if (filter) {
        where = ' WHERE p.creationDate BETWEEN "' + filter.dateFrom + '"' + ' AND "' + filter.dateTo + '"'
      }
      const entityManager = getManager()
      const query =
        `SELECT COUNT(b.Id) as count, b.Id, b.description FROM alert a
      INNER JOIN pet 
      on a.petId= pet.id
      INNER JOIN breed b
      on pet.breedId = b.id` +
        where +
        ` group by b.Id`
      const counts = await entityManager.query(query)
      return counts
    }
    



  static async filterAlertsByPetInPost(pet: Pet): Promise<QueryResult[]> {
    console.log('LLEGA AL ALERT REPO', pet)
    const entityManager = getManager()

    const query = AlertRepo.filterAlertsByPetInPostQuery + buildWhereStatements(pet) + ' order by creationDate DESC '
    console.log(query)
    const counts = await entityManager.query(query)
    return counts
  }
}
function buildWhereStatements(pet: Pet): string {
  let query = ''
  if (pet.furLength != undefined) {
    if (query.length < 5) {
      query = query + ' WHERE'
    } else {
      query = query + ' OR '
    }
    query = query + ' pet.furLengthId= ' + pet.furLength.Id
  }
  if (pet.color !== undefined) {
    if (query.length < 5) {
      query = query + ' WHERE'
    } else {
      query = query + ' OR '
    }
    query = query + '  pet.colorId= ' + pet.color.Id
  }
  console.log("BREED ", pet.breed)
  if (pet.breed !== undefined) {
    if (query.length < 5) {
      query = query + ' WHERE'
    } else {
      query = query + ' OR '
    }
    query = query + '  pet.breedId= ' + pet.breed.Id
  }
  if (pet.size !== undefined) {
    if (query.length < 5) {
      query = query + ' WHERE'
    } else {
      query = query + ' OR '
    }
    query = query + '  pet.sizeId= ' + pet.size.Id
  }

  return query
}
