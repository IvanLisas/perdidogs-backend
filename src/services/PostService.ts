import { Entity, getRepository } from 'typeorm'
import { Post } from '../models/Post'
import postRepo from '../repos/PostRepo'
import userService  from './UserService'

@Entity()
class PostService {
  async getAllPosts(idPost: number): Promise<Post[] | undefined> {
    try {
      return await postRepo.find({ postId: idPost })
    } catch (e) {
      console.log(e)
    }
  }
  async getMyPost(userId: number): Promise<Post[] | undefined> {
    try {
      const user= userService.getUser(userId)
      return await postRepo.find({ owner: user })
    } catch (e) {
      console.log(e)
    }
  }

  async getAPostById(idPost: number): Promise<Post> {
    try {
      return await postRepo.findOneOrFail({ postId: idPost })
    } catch (error) {
      throw 'No se encontró la publicación'
    }
  }
  //function (location,r)
  //x > location.x -r && x < location.x + r
  //y > location.y - r && y <location.y +r
  async createPost(post: Post): Promise<Post | undefined> {
    try {
      if (!post.picture || !post.description || !post.ownerPost || !post.pet || !post.size || !post.breed || !post.color) {
        throw 'creación de publicación inválida'
      } else return await postRepo.save(post)
    } catch (error) {
      throw 'No se pudo crear la publicacion'
    }
  }
  async deletePost(post: Post): Promise<Post | undefined> {
    try {
      if (!post.postId) {
        throw 'No se encontró la publicación'
      } else return await postRepo.save(post)
    } catch (error) {
      throw 'No se pudo borrar la publicacion '
    }
  }
  async updatePost(post: Post): Promise<Post | undefined> {
    try {
      if (!post.picture || !post.description || !post.ownerPost || !post.pet || !post.size || !post.breed || !post.color) {
        throw 'Actualizacion de publicación inválida'
      } else {
        return await postRepo.save(post)
      }
    } catch (error) {
      throw 'No se pudo actualizar la publicacion '
    }
  }
}
const postService = new PostService()

export default postService
