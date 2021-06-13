import { Entity, getRepository } from 'typeorm'
import { Post } from '../models/Post'
import postRepo from '../repos/PostRepo'
import userService from './UserService'

@Entity()
class PostService {
  async getAllPosts(idPost: number): Promise<Post[] | undefined> {
    return await postRepo.find({ postId: idPost })
  }
  async getPostsByUserId(idUser: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ ownerPost: {userId: idUser} })
  }

  async get(idPost: number): Promise<Post> {
    return await getRepository(Post).findOneOrFail({ postId: idPost })
  }
  //function (location,r)
  //x > location.x -r && x < location.x + r
  //y > location.y - r && y <location.y +r
  async createPost(post: Post): Promise<Post | undefined> {
    return await postRepo.save(post)
  }
  async deletePost(idPost: number): Promise<Post | undefined> {
    const post = await this.get(idPost)
    post.isActive = false
    return await getRepository(Post).save(post)
  }
  async updatePost(postId: number, idUser: number): Promise<Post | undefined> {
    const post = await this.get(postId)
    const user = await userService.get(idUser)

    if (user.userId == idUser) {
      return await postRepo.save(post)
    } else throw 'No se encontró la publicación'
  }
}
const postService = new PostService()

export default postService
