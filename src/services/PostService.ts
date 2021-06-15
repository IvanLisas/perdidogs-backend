import { Entity, getRepository } from 'typeorm'
import { Location } from '../models/Location'
import { Picture } from '../models/Picture'
import { Post } from '../models/Post'
import postRepo from '../repos/PostRepo'
import userService from './UserService'
import {Status, PostStatus} from '../models/PostStatus'
@Entity()
class PostService {
  async create(idUser: number, post: Post): Promise<Post> {
    const foundUser = await userService.get(idUser)
    
   // console.log(post)
    post.owner = foundUser
     
    post.status = await getRepository(PostStatus).findOneOrFail({description:"activo"})
   // console.log(post)
    console.log(await getRepository(Post).save(post))
    return await getRepository(Post).save(post)
  }
 
  async getAllPosts(idPost: number): Promise<Post[] | undefined> {
    return await postRepo.find({ Id: idPost })
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


  async deletePost(idPost: number): Promise<Post | undefined> {
    const post = await this.get(idPost)
    //TODO   post.status = false
    return await getRepository(Post).save(post)
  }
  async updatePost(postId: number, idUser: number): Promise<Post | undefined> {
    const post = await this.get(postId)
    const user = await userService.get(idUser)

    if (user.Id == idUser) {
      return await postRepo.save(post)
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
