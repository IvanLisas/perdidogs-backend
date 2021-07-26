import { Between, getRepository } from 'typeorm'
import { Alert } from '../models/Alert'
import { Filter } from '../models/Filter'
import { Notification } from '../models/Notification'
import { NotificationDTO } from '../models/NotificationDTO'
import { Pet } from '../models/Pet'
import { PostRepo } from '../repos/PostRepo'
import dropDownService from './DropDownService'
import notificationService from './NotificationService'
import userService from './UserService'

class AlertService {
  async getByUserId(userId: number): Promise<Alert[] | undefined> {
    return await getRepository(Alert).find({ relations: ['owner', 'pet', 'location', 'pet.furLength', 'pet.breed', 'pet.color', 'pet.size'], order: { creationDate: 'DESC' }, where: { owner: { Id: userId }, alertStatus:1 } })
  }

  async get(id: number): Promise<Alert[] | undefined> {
    return await getRepository(Alert).find({ relations: ['owner', 'pet', 'location'], where: { Id: id } })
  }

  async create(alert: Alert): Promise<Alert> {
    alert.alertStatus= await dropDownService.getAlertStatusById(1)
    const result = await getRepository(Alert).save(alert)
    this.populateNotificationTable(alert.pet, result.Id)
    return result
  }

  async populateNotificationTable(pet: Pet, alertId: number) {
    const postIds = this.deleteRepetedValues((await PostRepo.filterPostByPetAlert(pet)).map((x) => x.alertOrPostId))
    const notifications = postIds.map((x) => new Notification({ alertId: alertId, postId: x }))
    await getRepository(Notification).save(notifications)
  }

  deleteRepetedValues(data: number[]): number[] {
    const result = data.filter((x, index) => {
      return data.indexOf(x) === index
    })
    return result
  }

  async update(alert: Alert): Promise<Alert> {
    console.log(alert.pet.breed.Id == undefined)
    await notificationService.deleteNotificationByAlertId(alert.Id)
    this.populateNotificationTable(alert.pet, alert.Id)
    return await getRepository(Alert).save(alert)
  }

  async delete(id: number): Promise<Alert | undefined> {
    const alert = await getRepository(Alert).findOneOrFail({ Id: id })
    alert.alertStatus=await dropDownService.getAlertStatusById(2)
    notificationService.markAsRejectedByAlertId(id)
    return await getRepository(Alert).save(alert)
  }

  async perimeter(): Promise<number> {
    return 1
  }

  async match(id: number, alert: Alert): Promise<Alert[] | undefined> {
    const user = userService.get(id)
    if (user)
      return await getRepository(Alert).find({
        relations: ['owner', 'pet', 'location'],
        where: [
          { owner: user },
          { alertStatus: 1 },
          { pet: { furLength: alert.pet.furLength, color: alert.pet.color, breed: alert.pet.breed, size: alert.pet.size, sex: alert.pet.sex, hasCollar: alert.pet.hasCollar }, location: alert.location }
        ]
      })
  }

  async getAlertsByStatus(alertsStatus: number, filter: Filter): Promise<Alert[]> {
    let whereJson
    if (filter) {
      whereJson = { alertStatus: alertsStatus, creationDate: Between(filter.dateFrom, filter.dateTo) }
    } else {
      whereJson = { alertStatus: alertsStatus, creationDate: Between(new Date('1980-01-01'), new Date()) }
    }
    return await getRepository(Alert).find({
      relations: ['alertStatus'],
      where: { alertStatus: alertsStatus }
    })
  }
}

const alertService = new AlertService()
export default alertService
