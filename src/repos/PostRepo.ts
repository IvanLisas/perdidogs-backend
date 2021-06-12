import { EntityRepository, Repository } from 'typeorm'
import { Post } from '../models/Post'
 
@EntityRepository(Post)
 class PostRepo extends Repository<Post> {}
  
  const postRepo = new PostRepo()
  
  export default postRepo
  

