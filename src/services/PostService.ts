import { Entity, getRepository } from 'typeorm'
import { Post } from '../models/Post'
import { User } from '../models/User'
import postRepo from '../repos/PostRepo'
import userRepo from '../repos/UserRepo'
import userService from './UserService'
 
 
@Entity()
class PostService {

  async create(idUser: number, post: Post): Promise<Post >{
     
        const foundUser = await userService.get(idUser)    
        post.owner =foundUser 
        return await postRepo.save(post)
      
  }

  // async uploadPhoto(base: string): Promise<string> {
  //   try {
  //     const data = await axios(`https://api.imgur.com/3/upload`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Client-ID 7084d3c72f8fab9`,
  //       },
  //       data: { image: base }
  //     })
  //     return data.data.data.link;
  //   } catch (error) {
  //     throw  'Can`t upload image' 
  //   }
  // }

  async getAllPosts(idPost: number): Promise<Post[] | undefined> {
    return await postRepo.find({ Id: idPost })
  }
  async getPostsByUserId(idUser: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ owner: {Id: idUser} })
  }

  async get(idPost: number): Promise<Post> {
    return await getRepository(Post).findOneOrFail({ Id: idPost })
  }
  //function (location,r)
  //x > location.x -r && x < location.x + r
  //y > location.y - r && y <location.y +r
 
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
    } else throw 'No se encontró la publicación'
  }
}
const postService = new PostService()

export default postService
