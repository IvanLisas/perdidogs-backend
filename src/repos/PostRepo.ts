import { EntityRepository, Repository } from 'typeorm'
import { Post } from '../models/Post'

@EntityRepository(Post)
export class RepoPost extends Repository<Post> {

  async allPosts() {
    try {
      return await this.find()
    } catch (e) {
      console.log(e)
    }
  }

  async searchById(id: number) {
    return await this.findOneOrFail(id)
  }

  async anyPosts() {
    try {
      return (await this.count()) == 0
    } catch (e) {
      console.log(e)
    }
  }

  async savePost(post: Post) {
    try {
      await this.save(post)
    } catch (e) {
      console.log(e)
    }
  }
  
}
