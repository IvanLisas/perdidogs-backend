import { EntityRepository, getManager, Repository } from 'typeorm'
import { QueryResult } from '../admin-module/models/QueryResult'
import { Alert } from '../models/Alert'
import { Pet } from '../models/Pet'

@EntityRepository(Alert)
export class AlertRepo extends Repository<Alert> {
  static filterAlertsByPetInPostQuery = 'SELECT a.Id as alertOrPostId,a.locationId, pet.* FROM Alert a INNER JOIN pet ON a.petId= pet.Id'

  static async filterAlertsByPetInPost(pet: Pet): Promise<QueryResult[]> {
    console.log('LLEGA AL ALERT REPO', pet)
    const entityManager = getManager()
    const query = AlertRepo.filterAlertsByPetInPostQuery + buildWhereStatements(pet)
    const counts = await entityManager.query(query)
    return counts
  }

 
}
function buildWhereStatements(pet: Pet): string {
    let query = ''
    if (pet.furLength != undefined) {
      if (query.length < 5) {
        query = query + ' WHERE'
      }
      query = query + ' pet.furLengthId= ' + pet.furLength.Id
    }
    if (pet.color !== undefined) {
      if (query.length < 5) {
        query = query + ' WHERE'
      }
      query = query + ' AND pet.colorId= ' + pet.color.Id
    }
    if (pet.breed !== undefined) {
      if (query.length < 5) {
        query = query + ' WHERE'
      }
      query = query + ' AND pet.breedId= ' + pet.breed.Id
    }
    if (pet.size !== undefined) {
      if (query.length < 5) {
        query = query + ' WHERE'
      }
      query = query + ' AND pet.sizeId= ' + pet.size.Id
    }
    if (pet.hasCollar !== undefined) {
      if (query.length < 5) {
        query = query + ' WHERE'
      }
      query = query + ' AND pet.hasCollar=  ' + pet.hasCollar
    }
    return query
  }

