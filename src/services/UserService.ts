import { User } from '../models/User'
import { getRepository } from 'typeorm'
class UserService {
  async login(anEmail: string, aPassword: string): Promise<User> {
    return await getRepository(User).findOneOrFail({ email: anEmail, password: aPassword })
  }

  async get(id: number): Promise<User> {
    return await getRepository(User).findOneOrFail(id)
  }
  async save(user: User): Promise<User> {
    return await getRepository(User).save(user)
  }

  async create(user: User): Promise<User> {
    if (!getRepository(User).find({ email: user.email })) return await getRepository(User).save(user)
    else throw 'El email ya existe'
  }

  async update(user: User): Promise<User> {
    return await getRepository(User).save(user)
  }

  async delete(user: User): Promise<User> {
    user.isActive = false
    return await getRepository(User).save(user)
  }

  async registrateUser(user: User): Promise<User> {
    const userMail = await getRepository(User).findOne({email: user.email})
    console.log(userMail)
    if (!userMail) {
      return await this.save(user)
    }

    throw new Error('Este mail ya está en uso')
  }
}

const userService = new UserService()

export default userService
