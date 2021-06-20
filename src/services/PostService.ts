import { Between, Entity, getRepository, In } from 'typeorm'
import { Post } from '../models/Post'
import userService from './UserService'
import { Location } from '../models/Location'
import { Bounderies } from '../models/LatLang'
import { Picture } from '../models/Picture'

@Entity()
class PostService {
  async create(idUser: number, post: Post, picture: Picture): Promise<Post> {
    const foundUser = await userService.get(idUser)
    post.owner = foundUser
    post.pictures = [picture]
    return await getRepository(Post).save(post)
  }

  async getAllPosts(): Promise<Post[] | undefined> {
    return await getRepository(Post).find({
      relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.breed', 'pet.size']
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

  async update(postId: number, idUser: number): Promise<Post | undefined> {
    const post = await this.get(postId)
    const user = await userService.get(idUser)

    if (user.Id == idUser) {
      return await getRepository(Post).save(post)
    } else throw 'No tienes los permisos suficientes para actualizar la publicación'
  }
  //function (location,r)
  //x > location.x -r && x < location.x + r
  //y > location.y - r && y <location.y +r

  async getLocation(url: string): Promise<string> {
    return this.getLocation(url)
  }

  async getByLocation(bounderies: Bounderies): Promise<Post[] | undefined> {
    const southWest = bounderies.southWest
    const northEast = bounderies.northEast
    const extremeX = [southWest.latitude, northEast.latitude]
    const extremeY = [southWest.longitude, northEast.longitude]
    const locations = await getRepository(Location).find({ lat: Between(extremeX[0], extremeX[1]), long: Between(extremeY[0], extremeY[1]) })
    if (locations.length > 0) {
      const ids = locations.map(this.getLocationId)
      console.log('ids:', ids)
      return await getRepository(Post).find({
        relations: ['pet', 'pictures', 'owner', 'location', 'pet.fur', 'pet.breed', 'pet.size'],
        where: {
          location: { Id: In(ids) }
        }
      })
    } else return []
  }

  getLocationId(loc: Location): number {
    return loc.Id
  }
}

const postService = new PostService()
export default postService
