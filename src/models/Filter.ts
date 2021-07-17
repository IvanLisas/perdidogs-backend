import { Breed } from './Breed'
import { Color } from './Color'
import { Fur } from './Fur'
import { Point } from './LatLang'
import { Length } from './Length'
import { Location } from './Location'
import { Pet } from './Pet'

export class Filter {
  constructor(init?: Partial<Filter>) {
    Object.assign(this, init)
  }

  breed?: number
  hasCollar?: boolean
  color?: number
  length?: number
  size?: number
  sex?: string
  searchLocation?: Point
  deltaLocation?: Point

  static newFilter(pet: Pet, searchLocation: Point, deltaLocation: Point): Filter {
    const filter = new Filter()
    if (pet.breed !== undefined && pet.breed !== null) {
      filter.breed = pet.breed.Id
    }
    filter.hasCollar = pet.hasCollar
    if (pet.fur !== undefined && pet.fur !== null) {
      if (pet.fur.color !== undefined && pet.fur.color !== null) {
        filter.color = pet.fur.color.Id
      }
      if (pet.fur.length !== undefined && pet.fur.length !== null) {
        filter.length = pet.fur.length.Id
      }
    }
    if (pet.size !== undefined && pet.size !== null) {
      filter.size = pet.size.Id
    }
    filter.sex = pet.sex
    filter.searchLocation = searchLocation
    filter.deltaLocation = deltaLocation
    return filter
  }

  static fromJson(FilterJson: string): Filter {
    return Object.assign(new Filter(), FilterJson)
  }
}
