import { Entity, getRepository } from 'typeorm'
import { Location } from '../models/Location'
import { Picture } from '../models/Picture'
import { Post } from '../models/Post'
import userService from './UserService'
import {Status, PostStatus} from '../models/PostStatus'
@Entity()
class PostService {
  async create(idUser: number, post: Post): Promise<Post> {
    const foundUser = await userService.get(idUser)
    post.owner = foundUser    
    post.status = await getRepository(PostStatus).findOneOrFail({description:"activo"})
    console.log(await getRepository(Post).save(post))
    return await getRepository(Post).save(post)
  }
 
  async getAllPosts(idPost: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ Id: idPost })
  }
  async getPostsByUserId(idUser: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ owner: { Id: idUser } })
  }

  async get(postId: number): Promise<Post> {
    return await getRepository(Post).findOneOrFail({ Id: postId })
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

  async getLocation(url: string):Promise <string> {
    return this.getLocation(url)
  }
 
}
   

const postService = new PostService()
export default postService
