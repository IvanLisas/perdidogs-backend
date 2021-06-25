import { Between, Entity, getRepository, In, getManager, FindOperator } from 'typeorm'

import { Post } from '../models/Post'
import userService from './UserService'

import { Location } from '../models/Location'
import {  Point } from '../models/LatLang'
import { Filter } from '../models/Filter'
import { Pet } from '../models/Pet'

@Entity()
class PostService {
  async getPostByFilters(filter: Filter): Promise<Post[] | undefined> {
    if (filter.myLocation != null && filter.delta != null) {
      const pets = (await this.getByLocation(filter.myLocation, filter.delta))?.map((x) => x.pet)
      if (pets != null) {
        return await getRepository(Post).find({
          relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.breed', 'pet.size'],
          where: {
            pet: { Id: In(pets.map((x) => x.Id)) },
            isActive: true
          }
        })
      }
    } else {
      return getRepository(Post).find({
        relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.breed', 'pet.size','comments'],
        where: {
          isActive: true
        }
      })
    }
  }

  async create(idUser: number, post: Post): Promise<Post> {
    const foundUser = await userService.get(idUser)
    post.owner = foundUser
    return await getRepository(Post).save(post)
  }

  async getAllPosts(): Promise<Post[] | undefined> {
    return await getRepository(Post).find({
      relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.breed', 'pet.size','comments'],
      where: { isActive: true }
    })
  }
  async getPostsByUserId(idUser: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ owner: { Id: idUser } })
  }

  async get(idPost: number): Promise<Post> {
    return await getRepository(Post).findOneOrFail({
      relations: ['owner'],
      where: {
        Id: idPost
      }
    })
  }

  async update(post: Post): Promise<Post | undefined> {
    return await getRepository(Post).save(post)
  }
  //function (location,r)
  //x > location.x -r && x < location.x + r
  //y > location.y - r && y <location.y +r

  async getLocation(url: string): Promise<string> {
    return this.getLocation(url)
  }

  async getByLocation(point: Point, delta: Point): Promise<Post[] | undefined> {
    const extremeX = [point.lat - delta.lat / 2, point.lat + delta.lat / 2]
    const extremeY = [point.lng - delta.lng / 2, point.lng + delta.lng / 2]
    const locations = await getRepository(Location).find({ lat: Between(extremeX[0], extremeX[1]), long: Between(extremeY[0], extremeY[1]) })
    if (locations.length > 0) {
      const ids = locations.map((x) => x.Id)
      /*  console.log('ids:', ids) */
      return await getRepository(Post).find({
        relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.breed', 'pet.size','comments'],
        where: {
          location: { Id: In(ids), isActive: true }
        }
      })
    } else return []
  }

  getLocationId(loc: Location): number {
    return loc.Id
  }



  getPetIdsByFilters(pets: Pet[], filter: Filter): Pet[] {
    if (filter.sex != null) {
      pets = pets.filter((x) => x.sex == filter.sex)
    }
    if (filter.hasCollar != null) {
      pets = pets.filter((x) => x.hasCollar == filter.hasCollar)
    }
    if (filter.fur != null) {
      if (filter.fur.color != null) {
        pets = pets.filter((x) => x.fur.color == filter.fur?.color)
      }
      if (filter.fur.length != null) {
        pets = pets.filter((x) => x.fur.length == filter.fur?.length)
      }
    }
    if (filter.breed != null) {
      pets = pets.filter((x) => x.breed == filter.breed)
    }
    return pets
  }
}

const postService = new PostService()
export default postService
