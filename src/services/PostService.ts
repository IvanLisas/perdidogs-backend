import { Between, Entity, getRepository, In } from 'typeorm'
import { Point } from '../models/LatLang'
import { Post } from '../models/Post'
import userService from './UserService'
import { Location } from '../models/Location'
import { Filter } from '../models/Filter'
import { Pet } from '../models/Pet'
import { PostFilter } from '../admin-module/models/PostFilter'
import { Notification } from '../models/Notification'
import { AlertRepo } from '../repos/AlertRepo'
import { HelperService } from './HelperService'
import { Bootstrap } from '../bootstrap/Bootstrap'
import { PostStatus } from '../models/PostStatus'
import dropDownService from './DropDownService'
import notificationService from './NotificationService'
import { StatsFilter } from '../admin-module/models/StatsFilter'

@Entity()
class PostService {
  relations = ['pet', 'pictures', 'owner', 'location', 'pet.furLength', 'pet.color', 'pet.breed', 'pet.size', 'comments', 'comments.owner', 'postStatus', 'owner.role']
  async getPostByFilters(filter: Filter): Promise<Post[] | undefined> {
    if (filter.searchLocation !== undefined && filter.deltaLocation != undefined) {
      const pets = (await this.getByLocation(filter.searchLocation, filter.deltaLocation, filter.myLocation))?.map((x) => x.pet)
      if (pets != null) {
        const petIds = this.getPetIdsByFilters(pets, filter)?.map((x) => x.Id)
        console.log('PETS despues DE FILTRAR', petIds)
        const result = await getRepository(Post).find({
          relations: this.relations,
          where: {
            pet: { Id: In(petIds) },
            postStatus: 1
          }
        })
        return result
          .map((x) => {
            x.distance = HelperService.calculateDistanceBetweenToPoints(x.location, filter.myLocation)
            return x
          })
          .sort((a, b) => a.distance - b.distance)
      }
    } else {
      const result = await getRepository(Post).find({
        relations: this.relations,
        where: {
          postStatus: 1
        }
      })
      return result
        .map((x) => {
          x.distance = HelperService.calculateDistanceBetweenToPoints(x.location, filter.myLocation)
          return x
        })
        .sort((a, b) => a.distance - b.distance)
    }
  }

  async create(idUser: number, post: Post): Promise<Post> {
    const foundUser = await userService.get(idUser)
    post.owner = foundUser
    post.postStatus = await dropDownService.getPostStatusById(3)
    const result = await getRepository(Post).save(post)
    this.populateNotificationTable(post.pet, result.Id)
    return result
  }

  async populateNotificationTable(pet: Pet, postId: number) {
    const alertIds = this.deleteRepetedValues((await AlertRepo.filterAlertsByPetInPost(pet)).map((x) => x.alertOrPostId))
    const notifications = alertIds.map((x) => new Notification({ alertId: x, postId: postId }))
    console.log('NOTIFICATIONS ', notifications)
    await getRepository(Notification).save(notifications)
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
    return await getRepository(Post).find({
      where: { owner: { Id: idUser }, postStatus: 1 }
    })
  }

  async findById(idPost: number): Promise<Post> {
    return await getRepository(Post).findOneOrFail({
      relations: this.relations,
      where: {
        Id: idPost,
        postStatus: 1
      }
    })
  }

  async get(idPost: number): Promise<Post> {
    return await getRepository(Post).findOneOrFail({
      relations: this.relations,
      where: {
        Id: idPost
      }
    })
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return await getRepository(Post).find({
      relations: this.relations,
      where: {
        owner: userId
      }
    })
  }

  async update(post: Post): Promise<Post | undefined> {
    return await getRepository(Post).save(post)
  }

  async getLocation(url: string): Promise<string> {
    return this.getLocation(url)
  }

  async getByLocation(point: Point, delta: Point, myLocation: Point): Promise<Post[] | undefined> {
    const extremeX = [point.lat - delta.lat / 2, point.lat + delta.lat / 2]
    const extremeY = [point.lng - delta.lng / 2, point.lng + delta.lng / 2]
    const locations = await getRepository(Location).find({ lat: Between(extremeX[0], extremeX[1]), long: Between(extremeY[0], extremeY[1]) })
    if (locations.length > 0) {
      const ids = locations.map((x) => x.Id)
      const result = await getRepository(Post).find({
        relations: this.relations,
        where: {
          location: { Id: In(ids) },
          postStatus: 1
        }
      })
      return result
        .map((x) => {
          x.distance = HelperService.calculateDistanceBetweenToPoints(x.location, myLocation)
          return x
        })
        .sort((a, b) => a.distance - b.distance)
    } else return []
  }

  getLocationId(loc: Location): number {
    return loc.Id
  }

  getPetIdsByFilters(pets: Pet[], filter: Filter): Pet[] {
    console.log('CANTIDAD DE PETS ANTES DE FILTRAR  ', pets.length)
    if (filter !== undefined) {
      console.log('ENTRA EN EL getPetIdsByFilters', pets.length)
      if (filter.sex !== undefined && filter.sex !== null && pets.length > 0) {
        pets = pets.filter((x) => x.sex == filter.sex)
      }
      if (filter.hasCollar !== undefined && filter.hasCollar !== null && pets.length > 0) {
        pets = pets.filter((x) => x.hasCollar == filter.hasCollar)
      }
      console.log('Pets antes de filtrar por color ', filter.color, pets.length)
      if (filter.color !== undefined && filter.color !== null && pets.length > 0) {
        pets = pets.filter((x) => x.color.Id === filter.color)
        console.log('Pets despues de filtar por color', pets.length)
      }
      console.log('Pets2', pets.length)
      if (filter.furLength !== undefined && filter.furLength !== null && pets.length > 0) {
        console.log('Filtra por fur.lenghr')
        pets = pets.filter((x) => x.furLength.Id == filter.furLength)
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
      const posts = await getRepository(Post).find({ relations: this.relations })
      if (posts != null) {
        const postIds = this.getFilteredPostByAdminFilters(posts, filter)?.map((x) => x.Id)
        /*    console.log('Posts despues DE FILTRAR', postIds?.length) */
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

  getFilteredPostByAdminFilters(posts: Post[], filter: PostFilter): Post[] {
    /*    console.log('PET 1 ', posts?.[0]) */
    if (filter !== undefined) {
      if (filter.breed !== undefined && filter.breed !== null && posts.length > 0) posts = posts.filter((x) => x.pet.breed.Id == filter.breed)
      if (filter.ownerEmail && filter.ownerEmail !== null && posts.length > 0)
        posts = posts.filter((x) => {
          if (filter.ownerEmail) return x.owner.email.match(filter.ownerEmail)
        })
      if (filter !== undefined && filter.createdFrom !== undefined && filter.createdFrom !== null && posts.length > 0) {
        const createdFrom = new Date(filter.createdFrom)
        posts = posts.filter((x) => x.creationDate >= createdFrom)
      }
      if (filter !== undefined && filter.createdTo !== undefined && filter.createdTo !== null && posts.length > 0) {
        const createdTo = new Date(filter.createdTo)
        //posts.map(x=>console.log(x.creationDate.getMilliseconds(), createdTo.getMilliseconds()))
        posts = posts.filter((x) => x.creationDate <= createdTo)
        console.log('creeated to', filter.createdTo)
        console.log('creeated from', filter.createdFrom)
      }
      if (filter !== undefined && filter.postStatus !== undefined && filter.postStatus !== null && posts.length > 0) posts = posts.filter((x) => filter.postStatus?.some((x2) => x2 == x.postStatus.Id))
      /*     console.log('LLEGA AL FINAL DEL FILTRAR', posts.length) */
      return posts
    } else return posts
  }

  async getPostsByStatus(postsStatus: number, filter: StatsFilter): Promise<Post[]> {
    let whereJson
    if (filter) {
      whereJson = { postStatus: postsStatus, creationDate: Between(filter.dateFrom, filter.dateTo) }
    } else {
      whereJson = { postStatus: postsStatus, creationDate: Between(new Date('1980-01-01'), new Date()) }
    }
    return await getRepository(Post).find({
      relations: ['postStatus'],
      where: whereJson
    })
  }

  async aceptAPost(postId: number, userId: number): Promise<Post | undefined> {
    console.log(postId, userId)
    const post = await postService.get(postId)
    //console.log("POST" , post)
    const user = await userService.get(userId)
    console.log('USER', user.role)
    if (user.role.Id === 1) {
      post.postStatus.Id = 1
      //    post.postStatus.description='Inactivo'
      console.log('post status id', post.postStatus)
      return await getRepository(Post).save(post)
    }
  }

  async rejectAPost(postId: number, userId: number): Promise<Post | undefined> {
    const post = await postService.get(postId)
    const user = await userService.get(userId)
    if (user.role.Id === 1) {
      post.postStatus.Id = 2
      console.log('post status id', post.postStatus)
      return await getRepository(Post).save(post)
    }
  }

  async delete(postId: number): Promise<Post | undefined> {
    const post = await this.findById(postId)
    post.postStatus = await dropDownService.getPostStatusById(2)
    await notificationService.markAsRejectedByPostId(postId)
    return await getRepository(Post).save(post)
  }
}

const postService = new PostService()
export default postService
