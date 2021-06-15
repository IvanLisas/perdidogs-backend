import { Entity, getRepository } from 'typeorm'
import { Location } from '../models/Location'
import { Picture } from '../models/Picture'
import { Post } from '../models/Post'
import userService from './UserService'
import {Status, PostStatus} from '../models/PostStatus'
@Entity()
class PostService {
<<<<<<< HEAD
  async getAll(postId: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ id: postId })
  }
  async getMyPost(postId: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ id: postId })
=======
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
>>>>>>> ef1b09b6322739a3deb6e8d320f18c2b0f8d9f40
  }

  async get(postId: number): Promise<Post> {
    return await getRepository(Post).findOneOrFail({ id: postId })
  }
<<<<<<< HEAD
=======

>>>>>>> ef1b09b6322739a3deb6e8d320f18c2b0f8d9f40

  async create(post: Post): Promise<Post | undefined> {
    return await getRepository(Post).save(post)
  }
  // async delete(postId: number): Promise<Post | undefined> {
  //   const post = await this.get(postId)
  //   post.status = 1
  //   return await getRepository(Post).save({ id: postId })
  // }
  async update(postId: number, userId: number): Promise<Post | undefined> {
    const post = await this.get(postId)
<<<<<<< HEAD
    const user = await userService.get(userId)
    if (user.id == userId) {
      return await getRepository(Post).save(post)
    } else throw 'No se encontró la publicación'
=======
    const user = await userService.get(idUser)

    if (user.Id == idUser) {
      return await postRepo.save(post)
    } else throw 'No tienes los permisos suficientes para actualizar la publicación'
>>>>>>> ef1b09b6322739a3deb6e8d320f18c2b0f8d9f40
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
