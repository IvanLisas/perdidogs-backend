import { User } from '../../models/User'

export class PostFilter {
  constructor(init?: Partial<PostFilter>) {
    Object.assign(this, init)
  }

  breed?: number
  ownerEmail?: string
  createdFrom?: Date
  createdTo?: Date
  postStatus?: number[]

  static fromJson(FilterJson: string): PostFilter {
    return Object.assign(new PostFilter(), FilterJson)
  }
}
