import { Entity, getRepository } from 'typeorm'
import { Post } from '../models/Post'
import userService from './UserService'

@Entity()
class PostService {
  async getAll(postId: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ id: postId })
  }
  async getMyPost(postId: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ id: postId })
  }

  async get(postId: number): Promise<Post> {
    return await getRepository(Post).findOneOrFail({ id: postId })
  }

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
    const user = await userService.get(userId)
    if (user.id == userId) {
      return await getRepository(Post).save(post)
    } else throw 'No se encontró la publicación'
  }
}
const postService = new PostService()

export default postService
