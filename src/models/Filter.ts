import { Breed } from "./Breed"
import { Fur } from "./Fur"

export class Filter {
  constructor(init?: Partial<Filter>) {
    Object.assign(this, init)
  }

  breed?: Breed
  fur?: Fur
  hasCollar?:boolean
  sex?:string

  static fromJson(FilterJson: string): Filter {
    return Object.assign(new Filter(), FilterJson)
  }
}
