import { Entity, getRepository } from 'typeorm'
import { Post } from "../models/Post";
 
import postRepo from "../repos/PostRepo";

@Entity()
export class PostService {

   async allPost(): Promise<Post[]> {
    try {

        
        return await postRepo.find()
    } catch (e) {
        console.log(e)
    }
}

  async getPost(id_post: number):Promise<Post> {

    try {
      return await postRepo.findOneOrFail({postId:id_post})
    } catch (error) {
      throw 'No se encontró la publicación'
    }
  }


  
  async savePost(id_post: number):Promise<Post> {

    try {
      return await postRepo.save({postId:id_post})
    } catch (error) {
      throw 'No se encontró la publicación'
    }
  }



}


