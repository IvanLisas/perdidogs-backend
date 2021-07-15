import { Entity } from 'typeorm'
import { Post } from './Post'

@Entity()
export class NotificationDTO {
  constructor(init?: Partial<NotificationDTO>) {
    Object.assign(this, init)
  }

  alertId!:number
  postId!:number
  post!:Post

  static fromJson(AlertJson: string): NotificationDTO {
    return Object.assign(new NotificationDTO(), AlertJson)
  }
}
