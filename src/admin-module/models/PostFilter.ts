export class PostFilter {
  constructor(init?: Partial<PostFilter>) {
    Object.assign(this, init)
  }

  breed?: number
  ownerEmail?: string
  createdFrom?: Date
  createdTo?: Date
  status?: number

  static newFilter(_breed: number, _ownerEmail: string, _createdFrom: Date, _createdTo: Date, _status: number): PostFilter {
    const filter = new PostFilter()
    filter.breed = _breed
    filter.ownerEmail = _ownerEmail
    filter.createdFrom = _createdFrom
    filter.createdTo = _createdTo
    filter.status = _status
    return filter
  }

  static fromJson(FilterJson: string): PostFilter {
    return Object.assign(new PostFilter(), FilterJson)
  }
}
