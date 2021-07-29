import { Breed } from './Breed'
import { Color } from './Color'
import { Point } from './LatLang'
import { FurLength } from './FurLength'
import { Location } from './Location'
import { Pet } from './Pet'
import { Post } from './Post'

export class StatsFilter {
  constructor(init?: Partial<StatsFilter>) {
    Object.assign(this, init)
  }

  breed?: number
  dateFrom?: Date
  dateTo?: Date

  static fromJson(FilterJson: string): StatsFilter {
    return Object.assign(new StatsFilter(), FilterJson)
  }
}
