import { Entity } from 'typeorm'
import { Post } from '../../models/Post'
import { User } from "../../models/User"
import { UserStatus } from '../../models/UserStatus'

@Entity()
export class userDTO {
  constructor(init?: Partial<userDTO>) {
    Object.assign(this, init)
  }

  userId!:number
  firstName!: string  
  lastName!: string
  post!: Post[]
  email!: string
  userStatus!: UserStatus
  creationDate!: Date
  avatar?: string

  static fromJson(UserJson: string): userDTO {
    return Object.assign(new userDTO(), UserJson)
  }
}
