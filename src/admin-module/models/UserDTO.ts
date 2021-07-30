export class UserDTO {
  constructor(init?: Partial<UserDTO>) {
    Object.assign(this, init)
  }

  userId?:number
  firstName?: string  
  lastName?: string
  postLength?: number
  alertLength?:number
  email?: string
  userStatus?: string
  creationDate?: Date
  avatar?: string

  static fromJson(UserJson: string): UserDTO {
    return Object.assign(new UserDTO(), UserJson)
  }
}
