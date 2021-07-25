import { Point } from '../models/LatLang'
import { Location } from '../models/Location'
function rad(x: number): number {
  return (x * Math.PI) / 180
}

export class HelperService {
  static calculateDistanceBetweenToPoints(p1: Location, p2: Point): number {
    const radio = 6378137 //radio de la tierra en metros
    const dLat = rad(p2.lat - p1.lat) //distancia entre latitudes
    const dLong = rad(p2.lng - p1.long) //distancia entre longitudes
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = radio * c
    return distance/1000
  }
}
