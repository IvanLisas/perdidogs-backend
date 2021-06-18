import { User } from '../models/User'
import { getRepository } from 'typeorm'
class UserService {
  async login(anEmail: string, aPassword: string): Promise<User> {
    return await getRepository(User).findOneOrFail({ email: anEmail, password: aPassword })
  }

  async get(id: number): Promise<User> {
    return await getRepository(User).findOneOrFail({
      relations: ['post', 'post.pet', 'post.location', 'post.pictures'],
      where: {
        Id: id
      }
    })
  }
  async save(user: User): Promise<User> {
    return await getRepository(User).save(user)
  }

  async update(user: User): Promise<User> {
    return await getRepository(User).save(user)
  }

  async delete(user: User): Promise<User> {
    user.isActive = false
    return await getRepository(User).save(user)
  }
}

const userService = new UserService()

export default userService
