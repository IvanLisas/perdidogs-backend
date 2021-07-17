import { Breed } from './Breed'
import { Color } from './Color'
import { Fur } from './Fur'
import { Point } from './LatLang'
import { Length } from './Length'

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

  static newFilter(_breed: Breed, _hasCollar: boolean, _color: Color, _length: Length, _size: Length, _sex: string, _myLocation: Point, _delta: Point): Filter {
    const filter = new Filter()
    if (_breed != undefined && _breed != null) {
      filter.breed = _breed.Id
    }
    filter.hasCollar = _hasCollar
    if (_color != undefined && _color != null) {
      filter.color = _color.Id
    }
    if (_length != undefined && _length != null) {
      filter.length = _length.Id
    }
    if ( _size != undefined &&  _size != null) {
      filter.size = _size.Id
    }
    filter.sex = _sex
    filter.searchLocation = _myLocation
    filter.deltaLocation = _delta
    return filter
  }

  static fromJson(FilterJson: string): Filter {
    return Object.assign(new Filter(), FilterJson)
  }
}
