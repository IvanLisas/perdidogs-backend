import { getRepository } from 'typeorm'
import { Alert } from '../models/Alert'
import userService from './UserService'

class AlertService {
  async get(id: number): Promise<Alert[] | undefined> {
    return await getRepository(Alert).find({ relations: ['owner', 'pet', 'location'], where: { Id: id } })
  }

  async create(alert: Alert): Promise<Alert> {
    return await getRepository(Alert).save(alert)
  }

  async update(alert: Alert): Promise<Alert> {
    return await getRepository(Alert).save(alert)
  }

  async delete(id: number): Promise<Alert | undefined> {
    const alert = await getRepository(Alert).findOneOrFail({ Id: id })
    if (alert.alertStatus.Id == 1) {
      alert.alertStatus.Id = 2
      return await getRepository(Alert).save(alert)
    }
  }

  async perimeter(): Promise<number> {return 1}

  async match(id: number, alert: Alert): Promise<Alert[] | undefined> {
    const user = userService.get(id)
    if (user) 
    return await getRepository(Alert).find({ relations: ['owner', 'pet', 'location'], 
    where: [
        { owner: user }, 
        { alertStatus: 1 }, 
        { pet: {fur: alert.pet.fur, breed: alert.pet.breed, size: alert.pet.size, sex: alert.pet.sex, hasCollar: alert.pet.hasCollar}, 
        location: alert.location }] })
  }

  async getAlertsByStatus(alertsStatus: number): Promise<Alert[] >{

    return await getRepository(Alert).find ({
      relations: [ 'alertStatus'],
      where: {  alertStatus : alertsStatus }
    })
}

}

const alertService = new AlertService()
export default alertService

