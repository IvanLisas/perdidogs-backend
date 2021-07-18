import { User } from "../../models/User"

export class PostFilter {
  constructor(init?: Partial<PostFilter>) {
    Object.assign(this, init)
  }

  breed?: number
  user?: User 
  ownerEmail?: string
  createdFrom?: Date
  createdTo?: Date
  postStatus?: number
  userStatus?: number

  static newFilter(_breed: number, _user: User, _ownerEmail: string, _createdFrom: Date, _createdTo: Date, _status: number,_userStatus:number): PostFilter {
    const filter = new PostFilter()
    filter.breed = _breed
    filter.user = _user
    filter.ownerEmail = _ownerEmail
    filter.createdFrom = _createdFrom
    filter.createdTo = _createdTo
    filter.postStatus = _status
    filter.userStatus=_userStatus
    return filter
  }

  static fromJson(FilterJson: string): PostFilter {
    return Object.assign(new PostFilter(), FilterJson)
  }
}
