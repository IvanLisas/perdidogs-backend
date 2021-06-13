import { Entity, getRepository } from 'typeorm'
import { Post } from '../models/Post'
import postRepo from '../repos/PostRepo'


@Entity()
export class PostService {
 
  async getAllPosts( idPost: number): Promise<Post[] | undefined> {
    try {
      return await postRepo.find({ postId: idPost })

    } catch (e) {
      console.log(e)
    }
  }

  async getAPostById(idPost: number): Promise<Post> {
    try {
      return await postRepo.findOneOrFail({postId: idPost})
    } catch (error) {
      throw 'No se encontró la publicación'
    }
  }
  //function (location,r)
  //x > location.x -r && x < location.x + r
  //y > location.y - r && y <location.y +r
  async createPost(post: Post): Promise<Post> {
    try {
      
      return await postRepo.save(post)
    } catch (error) {
      throw 'No se pudo crear la publicacion '
    }
  }
  async deletePost(post: Post): Promise<Post> {
    try {

      return await postRepo.save(post)
    } catch (error) {
      throw 'No se pudo borrar la publicacion '
    }
  }
  async updatePost(post: Post): Promise<Post> {
    try {
      return await postRepo.save(post)
    } catch (error) {
      throw 'No se pudo actualizar la publicacion '
    }
  }
}
const postService = new PostService()

export default postService