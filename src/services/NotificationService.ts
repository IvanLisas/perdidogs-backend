import { Between, Entity, getRepository, In, Index } from 'typeorm'
import { Point } from '../models/LatLang'

import { Post } from '../models/Post'
import userService from './UserService'

import { Location } from '../models/Location'
import { Filter } from '../models/Filter'
import { Pet } from '../models/Pet'
import { PostFilter } from '../admin-module/models/PostFilter'
import { PostRepo } from '../repos/PostRepo'
import { Notification } from '../models/Notification'
import { AlertRepo } from '../repos/AlertRepo'
import { NotificationDTO } from '../models/NotificationDTO'
@Entity()
class NotificationService {
  async deleteNotificationByAlertId(Id: number) {
    return getRepository(Notification).delete({alertId:Id})
  }
  async markAsRead(postId: number, alertId: number): Promise<Notification> {
    const notification = await this.findById(postId,alertId)
    notification.hasBeenRead=true
    return getRepository(Notification).save(notification)
  }

  async markAsRejected(postId: number, alertId: number): Promise<Notification> {
    const notification = await this.findById(postId,alertId)
    notification.hasBeenRejected=true
    return getRepository(Notification).save(notification)
  }

  async findById(postId: number, alertId: number){
    return getRepository(Notification).findOneOrFail({postId:postId, alertId:alertId})
  }

  async getNotificationDtosByUserId(userId: number): Promise<NotificationDTO[]> {
    const result= this.deleteRepetedValues(await PostRepo.getPostsByUserId(userId))
    console.log(result)
    return result
  }

  deleteRepetedValues(data: NotificationDTO[]): NotificationDTO[] {
    const unique :NotificationDTO[]= []
    data.forEach((value)=> {
      if((unique.filter(x=>x.postId==value.postId)).length==0){
        unique.push(value)
      }
    })
    unique.map(x=>{console.log(x.alertId, x.postId)})
    return unique
  }
}

const notificationService = new NotificationService()
export default notificationService
