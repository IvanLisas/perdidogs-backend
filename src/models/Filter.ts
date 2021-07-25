import { Breed } from './Breed'
import { Color } from './Color'
import { Point } from './LatLang'
import { FurLength } from './FurLength'
import { Location } from './Location'
import { Pet } from './Pet'
import { Post } from './Post'

export class Filter {
  constructor(init?: Partial<Filter>) {
    Object.assign(this, init)
  }

  breed?: number
  hasCollar?: boolean
  color?: number
  furLength?: number
  size?: number
  sex?: string
  searchLocation?: Point
  deltaLocation?: Point
  myLocation!: Point
  dateFrom?: Date
  dateTo?: Date

  static newFilter(pet: Pet, searchLocation: Point, deltaLocation: Point, myLocation:Point): Filter {
    const filter = new Filter()
    if (pet.breed !== undefined && pet.breed !== null) {
      filter.breed = pet.breed.Id
    }
    filter.hasCollar = pet.hasCollar
    if (pet.color !== undefined && pet.color !== null) {
      filter.color = pet.color.Id
    }
    if (pet.furLength !== undefined && pet.furLength !== null) {
      filter.furLength = pet.furLength.Id
    }
    if (pet.size !== undefined && pet.size !== null) {
      filter.size = pet.size.Id
    }
    filter.sex = pet.sex
    if (searchLocation !== undefined && searchLocation !== null) {
      filter.searchLocation = searchLocation
    }
    if (deltaLocation!== undefined && deltaLocation!== null) {
      filter.deltaLocation = deltaLocation
    }
    filter.myLocation=myLocation
    return filter
  }

  static fromJson(FilterJson: string): Filter {
    return Object.assign(new Filter(), FilterJson)
  }
}
