import { EntityRepository, getManager, Repository } from 'typeorm'
import { QueryResult } from '../admin-module/models/QueryResult';
import { Alert } from '../models/Alert'
import { Pet } from '../models/Pet';

@EntityRepository(Alert)
export class AlertRepo extends Repository<Alert> {
    static async filterAlertsByPetInPost(pet:Pet):Promise<QueryResult[]>{
        console.log("LLEGA AL ALERT REPO")
        const entityManager = getManager();
        const counts = await entityManager.query(
        `SELECT a.Id as alertOrPostId,a.locationId, pet.* FROM Alert a
        INNER JOIN pet  
        ON a.petId= petId
        WHERE pet.colorId= `+ pet.color.Id+
        ' AND pet.furLength= '+ pet.furLength +
        ' AND pet.breedId= '+ pet.breed +
        ' AND pet.hasCollar= '+ pet.hasCollar + 
        ' AND pet.sizeId= ' + pet.size);
        return counts
      }


}