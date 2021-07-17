import { Breed } from './Breed'
import { Fur } from './Fur'
import { Point } from './LatLang'

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

  static newFilter(_breed: number, _hasCollar: boolean, _color: number, _length: number, _size: number, _sex: string, _myLocation: Point, _delta: Point): Filter {
    const filter = new Filter()
    filter.breed = _breed
    filter.hasCollar = _hasCollar
    filter.color = _color
    filter.length = _length
    filter.size = _size
    filter.sex = _sex
    filter.searchLocation = _myLocation
    filter.deltaLocation = _delta
    return filter
  }

  static fromJson(FilterJson: string): Filter {
    return Object.assign(new Filter(), FilterJson)
  }
}
