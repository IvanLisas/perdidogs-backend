import { User } from '../models/User'
import { getRepository } from 'typeorm'
class UserService {
  async login(anEmail: string, aPassword: string): Promise<User> {
    try {
      return await getRepository(User).findOneOrFail({ email: anEmail, password: aPassword })
    } catch (error) {
      throw new Error('Usuario o contaseña incorrectos')
    }
  }

  async get(id: number): Promise<User> {
    return await getRepository(User).findOneOrFail(id)
  }

  async save(user: User): Promise<User> {
    return await getRepository(User).save(user)
  }

  async delete(user: User): Promise<User> {
    user.isActive = false
    return await getRepository(User).save(user)
  }
}

const userService = new UserService()

export default userService
