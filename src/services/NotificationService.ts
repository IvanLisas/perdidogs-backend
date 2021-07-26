import { Entity, getRepository } from 'typeorm'

import { PostRepo } from '../repos/PostRepo'
import { Notification } from '../models/Notification'
import { NotificationDTO } from '../models/NotificationDTO'
@Entity()
class NotificationService {
  async deleteNotificationByAlertId(Id: number) {
    return getRepository(Notification).delete({ alertId: Id })
  }
  async markAsRead(postId: number): Promise<Notification[]> {
    const notifications = await this.findByPostId(postId)
    notifications.forEach((x) => (x.hasBeenRead = true))
    return getRepository(Notification).save(notifications)
  }

  async markAsRejectedByPostId(postId: number): Promise<Notification[]> {
    const notifications = await this.findByPostId(postId)
    notifications.forEach((x) => (x.hasBeenRejected = true))
    console.log('NOTIFICATIONS ', notifications)
    return getRepository(Notification).save(notifications)
    //return getRepository(Notification).save(notifications)
  }

  
  async markAsRejectedByAlertId(alertId: number): Promise<Notification[]> {
    const notifications = await this.findByAlertId(alertId)
    notifications.forEach((x) => (x.hasBeenRejected = true))
    console.log('NOTIFICATIONS ', notifications)
    return getRepository(Notification).save(notifications)
    //return getRepository(Notification).save(notifications)
  }

  async findById(postId: number, alertId: number) {
    return getRepository(Notification).findOneOrFail({ postId: postId, alertId: alertId })
  }

  async findByPostId(postId: number): Promise<Notification[]> {
    return getRepository(Notification).find({ postId: postId })
  }

  async findByAlertId(alertId: number): Promise<Notification[]> {
    return getRepository(Notification).find({ alertId: alertId })
  }

  async getNotificationDtosByUserId(userId: number): Promise<NotificationDTO[]> {
    const result = this.deleteRepetedValues(await PostRepo.getPostsByUserId(userId))
    return result
  }

  deleteRepetedValues(data: NotificationDTO[]): NotificationDTO[] {
    const unique: NotificationDTO[] = []
    data.forEach((value) => {
      if (unique.filter((x) => x.postId == value.postId).length == 0) {
        unique.push(value)
      }
    })
    unique.map((x) => {
      console.log(x.alertId, x.postId)
    })
    return unique
  }
}

const notificationService = new NotificationService()
export default notificationService
