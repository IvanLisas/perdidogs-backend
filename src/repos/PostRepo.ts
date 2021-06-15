import { EntityRepository, Repository } from 'typeorm'
import { Post } from '../models/Post'
 
@EntityRepository(Post)
export class PostRepo extends Repository<Post> {}

