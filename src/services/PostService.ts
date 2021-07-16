import { Between, Entity, getRepository, In, Index } from 'typeorm'
import { Point } from '../models/LatLang'
import { Post } from '../models/Post'
import userService from './UserService'
import { Location } from '../models/Location'
import { Filter } from '../models/Filter'
import { Pet } from '../models/Pet'
import { PostFilter } from '../admin-module/models/PostFilter'
import { Notification } from '../models/Notification'
import { AlertRepo } from '../repos/AlertRepo'
import { User } from '../models/User'

@Entity()
class PostService {
  relations = ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.fur.color', 'pet.fur.length', 'pet.breed', 'pet.size', 'comments', 'comments.owner', 'postStatus', 'owner.role']
  async getPostByFilters(filter: Filter): Promise<Post[] | undefined> {
    if (filter.myLocation != null && filter.delta != null) {
      const pets = (await this.getByLocation(filter.myLocation, filter.delta))?.map((x) => x.pet)
      if (pets != null) {
        const petIds = this.getPetIdsByFilters(pets, filter)?.map((x) => x.Id)
        console.log('PETS despues DE FILTRAR', petIds?.length)
        return await getRepository(Post).find({
          relations: this.relations,
          where: {
            pet: { Id: In(petIds) },
            postStatus: 1
          }
        })
      }
    } else {
      return getRepository(Post).find({
        relations: this.relations,
        where: {
          postStatus: 1
        }
      })
    }
  }

  async create(idUser: number, post: Post): Promise<Post> {
    const foundUser = await userService.get(idUser)
    post.owner = foundUser
    const result = await getRepository(Post).save(post)
    this.populateAlertPostTable(post.pet, result.Id)
    return result
  }

  async populateAlertPostTable(pet: Pet, postId: number) {
    const alertIds = this.deleteRepetedValues((await AlertRepo.filterAlertsByPetInPost(pet)).map((x) => x.alertOrPostId))
    const alertPosts = alertIds.map((x) => new Notification({ alertId: x, postId: postId }))
    await getRepository(Notification).save(alertPosts)
  }

  deleteRepetedValues(data: number[]): number[] {
    const result = data.filter((x, index) => {
      return data.indexOf(x) === index
    })
    console.log('alertIds ', result)
    return result
  }

  async getAllPosts(): Promise<Post[] | undefined> {
    return await getRepository(Post).find({
      relations: this.relations
    })
  }

  async getPostsByUserId(idUser: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ owner: { Id: idUser } })
  }

  async get(idPost: number): Promise<Post> {
    return await getRepository(Post).findOneOrFail({
      relations: this.relations,
      where: {
        Id: idPost,
        postStatus: 1
      }
    })
  }

  async update(post: Post): Promise<Post | undefined> {
    if (post.postStatus.Id === 1) {
      return await getRepository(Post).save(post)
    } else {
      post.postStatus.Id == 2
      post.postStatus.description == 'Inactivo'
    }
  }

  async getLocation(url: string): Promise<string> {
    return this.getLocation(url)
  }

  async getByLocation(point: Point, delta: Point): Promise<Post[] | undefined> {
    const extremeX = [point.lat - delta.lat / 2, point.lat + delta.lat / 2]
    const extremeY = [point.lng - delta.lng / 2, point.lng + delta.lng / 2]
    const locations = await getRepository(Location).find({ lat: Between(extremeX[0], extremeX[1]), long: Between(extremeY[0], extremeY[1]) })
    if (locations.length > 0) {
      const ids = locations.map((x) => x.Id)
      return await getRepository(Post).find({
        relations: this.relations,
        where: {
          location: { Id: In(ids), postStatus: 1 }
        }
      })
    } else return []
  }

  getLocationId(loc: Location): number {
    return loc.Id
  }

  getPetIdsByFilters(pets: Pet[], filter: Filter): Pet[] {
    console.log('PET 1 ', pets?.[0])
    if (filter !== undefined) {
      console.log('ENTRA EN EL getPetIdsByFilters', pets.length)
      if (filter.sex !== undefined && filter.sex !== null && pets.length > 0) {
        pets = pets.filter((x) => x.sex == filter.sex)
      }
      if (filter.hasCollar !== undefined && filter.hasCollar !== null && pets.length > 0) {
        pets = pets.filter((x) => x.hasCollar == filter.hasCollar)
      }
      console.log('Pets 1 antes de color ', filter.color, pets.length)
      if (filter.color !== undefined && filter.color !== null && pets.length > 0) {
        console.log('Filtra por color', pets[0].fur.color)
        pets = pets.filter((x) => x.fur.color.Id === filter.color)
        console.log('Pets', pets.length)
      }
      console.log('Pets2', pets.length)
      if (filter.length !== undefined && filter.length !== null && pets.length > 0) {
        console.log('Filtra por fur.lenghr')
        pets = pets.filter((x) => x.fur.length.Id == filter.length)
        console.log('Pets', pets.length)
      }
      console.log('Pets3', pets.length)
      if (filter.breed !== undefined && filter.breed !== null && pets.length > 0) {
        console.log('Filtra por breed')
        pets = pets.filter((x) => x.breed.Id == filter.breed)
        console.log('Pets', pets.length)
      }
      if (filter.size !== undefined && filter.size !== null && pets.length > 0) {
        console.log('Filtra por size')
        pets = pets.filter((x) => x.size.Id == filter.size)
        console.log('Pets', pets.length)
      }
      console.log('LLEGA AL FINAL DEL FILTRAR', pets.length)
      return pets
    } else {
      return pets
    }
  }

  async getPostByAdminFilters(filter: PostFilter): Promise<Post[] | undefined> {
    if (filter != null) {
      const posts = await getRepository(Post).find()
      if (posts != null) {
        const postIds = this.getFilteredPostByAdminFilters(posts, filter)?.map((x) => x.Id)
        console.log('Posts despues DE FILTRAR', postIds?.length)
        return await getRepository(Post).find({
          relations: this.relations,
          where: {
            Id: In(postIds)
          }
        })
      }
    } else {
      return getRepository(Post).find({
        relations: this.relations
      })
    }
  }

  getFilteredPostByAdminFilters(posts: Post[], filtro: PostFilter): Post[] {
    console.log('PET 1 ', posts?.[0])
    if (filtro !== undefined) {
      if (filtro.breed !== undefined && filtro.breed !== null && posts.length > 0) posts = posts.filter((x) => x.pet.breed.Id == filtro.breed)
      if (filtro.ownerEmail !== undefined && filtro.ownerEmail !== null && posts.length > 0) posts = posts.filter((x) => x.owner.email == filtro.ownerEmail)
      if (filtro !== undefined && filtro.createdFrom !== undefined && filtro.createdFrom !== null && posts.length > 0) {
        const createdFrom = filtro.createdFrom
        posts = posts.filter((x) => x.creationDate >= createdFrom)
      }
      if (filtro !== undefined && filtro.createdTo !== undefined && filtro.createdTo !== null && posts.length > 0) {
        const createdTo = filtro.createdTo
        posts = posts.filter((x) => x.creationDate >= createdTo)
      }
      if (filtro !== undefined && filtro.postStatus !== undefined && filtro.postStatus !== null && posts.length > 0) posts = posts.filter((x) => x.postStatus.Id == filtro.postStatus)
      if (filtro !== undefined && filtro.userStatus !== undefined && filtro.userStatus !== null && posts.length > 0) posts = posts.filter((x) => x.postStatus.Id == filtro.userStatus)
      console.log('LLEGA AL FINAL DEL FILTRAR', posts.length)
      return posts
    } else return posts
  }

  async getPostsByStatus(postsStatus: number): Promise<Post[]> {
    return await getRepository(Post).find({
      relations: ['postStatus'],
      where: { postStatus: postsStatus }
    })
  }

  async delete(postId: number, userId: number): Promise<Post> {
    const post = (await getRepository(Post).findOneOrFail({ Id: postId }, { relations: this.relations })) as Post
    const user = (await getRepository(User).findOneOrFail({ Id: userId }, { relations: ['role'] })) as User
    if (post.postStatus.Id != 1) throw new Error('Este post esta deshabilitado.')
    if (post.owner.role.Id != 1 && post.owner != user) throw new Error('No tiene permisos para eliminar este post')
    post.postStatus.Id = 2
    return await getRepository(Post).save(post)
  }
}

const postService = new PostService()
export default postService
