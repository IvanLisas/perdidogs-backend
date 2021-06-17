import { Between, Entity, getRepository, In } from 'typeorm'
 
import { Post } from '../models/Post'
import userService from './UserService'
import {Status, PostStatus} from '../models/PostStatus'
import { Location } from '../models/Location'
@Entity()
class PostService {
  async create(idUser: number, post: Post): Promise<Post> {
    const foundUser = await userService.get(idUser)
   // console.log(post)
    post.owner = foundUser
    post.status = await getRepository(PostStatus).findOneOrFail({description:"activo"})
   
   
    //console.log(post)
    //console.log(await getRepository(Post).save(post))
    return await getRepository(Post).save(post)
  }
 
  async getAllPosts(idPost: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ Id: idPost })
  }
  async getPostsByUserId(idUser: number): Promise<Post[] | undefined> {
    return await getRepository(Post).find({ owner: { Id: idUser } })
  }

  async get(idPost: number): Promise<Post> {
   
    return await getRepository(Post).findOneOrFail({
      relations: ['owner'],
      where: {
        Id: idPost
      }
    })
  }

  async update(postId: number, idUser: number): Promise<Post | undefined> {
    const post = await this.get(postId)
    const user = await userService.get(idUser)

    if (user.Id == idUser) {
      return await getRepository(Post).save(post)
    } else throw 'No tienes los permisos suficientes para actualizar la publicación'
  }
   //function (location,r)
  //x > location.x -r && x < location.x + r
  //y > location.y - r && y <location.y +r

  async getLocation(url: string):Promise <string> {
    return this.getLocation(url)
  }

  async getByLocation(loc: Location, radio: number): Promise<Post[]|undefined> {
    const extremeX= this.calculateExtreme(loc.x, radio)
    const extremeY= this.calculateExtreme(loc.y, radio)
    const locations= await getRepository(Location).find({x: Between (extremeX[0], extremeX[1]),y: Between (extremeY[0], extremeY[1]) })
    if(locations!=null){
      return await getRepository(Post).find({location: In(locations)})
    }
  }

  getLocationId(loc:Location):number{
    return loc.Id
  }
  
  calculateExtreme(n:number, radio:number):Array<number>{
    const realRadio= radio/111
    return [n-realRadio, n+realRadio]
  }
 
}
   

const postService = new PostService()
export default postService
