import { Entity } from 'typeorm'
import { Post } from '../models/Post'
import postRepo from '../repos/PostRepo'
import userService from './UserService'

@Entity()
class PostService {
  async getAllPosts(idPost: number): Promise<Post[] | undefined> {
    return await postRepo.find({ postId: idPost })
  }
  async getMyPost(idPost: number, idUser: number): Promise<Post[] | undefined> {
    //const user = userService.getUser(userId)
    // const posts = user.pos
    // return await postRepo.find({ post.postOwner: user})

    return await postRepo.find({ idPost })
  }

  async getAPostById(idPost: number): Promise<Post> {
    return await postRepo.findOneOrFail({ postId: idPost })
  }
  //function (location,r)
  //x > location.x -r && x < location.x + r
  //y > location.y - r && y <location.y +r
  async createPost(post: Post): Promise<Post | undefined> {
    return await postRepo.save(post)
  }
  async deletePost(idPost: number): Promise<Post | undefined> {
    const post = await this.getAPostById(idPost)
    post.isActive = false
    return await postRepo.save({ postId: idPost })
  }
  async updatePost(postId: number, idUser: number): Promise<Post | undefined> {
    const post = await this.getAPostById(postId)
    const user = await userService.getUser(idUser)

    if (user.userId == idUser) {
      return await postRepo.save(post)
    } else throw 'No se encontró la publicación'
  }
}
const postService = new PostService()

export default postService
