import { Entity } from 'typeorm'
import { Post } from '../models/Post'
import postRepo from '../repos/PostRepo'
import userService from './UserService'

@Entity()
class PostService {
  async getAll(postId: number): Promise<Post[] | undefined> {
    return await postRepo.find({ id: postId })
  }
  async getMyPost(postId: number): Promise<Post[] | undefined> {
    return await postRepo.find({ id: postId })
  }

  async get(postId: number): Promise<Post> {
    return await postRepo.findOneOrFail({ id: postId })
  }

  async create(post: Post): Promise<Post | undefined> {
    return await postRepo.save(post)
  }
  // async delete(postId: number): Promise<Post | undefined> {
  //   const post = await this.get(postId)
  //   post.status = 1
  //   return await postRepo.save({ id: postId })
  // }
  async update(postId: number, userId: number): Promise<Post | undefined> {
    const post = await this.get(postId)
    const user = await userService.get(userId)
    if (user.id == userId) {
      return await postRepo.save(post)
    } else throw 'No se encontró la publicación'
  }
}
const postService = new PostService()

export default postService
