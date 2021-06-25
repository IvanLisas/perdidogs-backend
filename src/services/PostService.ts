import { Between, Entity, getRepository, In, getManager, FindOperator } from 'typeorm'
import {  Point } from '../models/LatLang'

import { Post } from '../models/Post'
import userService from './UserService'

import { Location } from '../models/Location'
import { Filter } from '../models/Filter'
import { Pet } from '../models/Pet'
@Entity()
class PostService {
  async getPostByFilters(filter: Filter, ): Promise<Post[] | undefined> {
    if (filter.myLocation != null && filter.delta != null) {
      const pets = (await this.getByLocation(filter.myLocation, filter.delta))?.map(x=>x.pet)
      if (pets != null) {
        const petIds= (this.getPetIdsByFilters(pets, filter))?.map(x=>x.Id);
        console.log("PETS despues DE FILTRAR", petIds?.length)
        return await getRepository(Post).find({
          relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.breed', 'pet.size','comments','comments.owner'],
          where: {
            pet: { Id: In(petIds) },
            isActive: true
          }
        })
      }
    } else {
      return getRepository(Post).find({
        relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.breed', 'pet.size','comments','comments.owner'],
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
      relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.breed', 'pet.size','comments','comments.owner'],
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
        Id: idPost,
        isActive: true
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
        relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur','pet.fur.color', 'pet.fur.length', 'pet.breed', 'pet.size','comments','comments.owner'],
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
    console.log("Entra en el getFilter", pets.length)
    if (filter.sex!==undefined&& filter.sex !== null&&pets.length>0) {
      pets = pets.filter((x) => x.sex == filter.sex)
    }
    if (filter.hasCollar!==undefined&&filter.hasCollar !== null&&pets.length>0) {
      pets = pets.filter((x) => x.hasCollar == filter.hasCollar)
    }
    console.log("Pets 1", pets.length, filter.color )
    if (filter.color!==undefined&&filter.color !== null && pets.length>0) {
      console.log("Filtra por color", pets.map(x=>console.log(x.fur.color)) )
      pets = pets.filter((x) => (x.fur.color.Id == filter.color))
      console.log("Pets", pets.length )
    }
    console.log("Pets2", pets.length )
    if (filter.length!==undefined&&filter.length !== null&&pets.length>0) {
      console.log("Filtra por fur.lenghr", )
      pets = pets.filter((x) => x.fur.length.Id == filter.length)
      console.log("Pets", pets.length )
    }
    console.log("Pets3", pets.length )
    if (filter.breed!==undefined&&filter.breed !== null&&pets.length>0) {
      console.log("Filtra por breed", )
      pets = pets.filter((x) => x.breed.Id == filter.breed)
      console.log("Pets", pets.length )
    }
    console.log("LLEGA AL FINAL DEL FILTAR", pets.length)
    return pets
  }
}

const postService = new PostService()
export default postService
