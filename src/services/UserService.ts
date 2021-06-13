import { User } from '../models/User'
import { getRepository } from 'typeorm'
import { throws } from 'node:assert'

class UserService {
  async login(anEmail: string, aPassword: string): Promise<User> {
    try {
      return await getRepository(User).findOneOrFail({ email: anEmail, password: aPassword })
    } catch (error) {
      throw new Error('Usuario o contaseña incorrectos')
    }
  }

<<<<<<< HEAD
  async getUser(id: number): Promise<User> {
    try {
      console.log(userRepo.findOneOrFail({ userId: id }))
      return await userRepo.findOneOrFail({ userId: id })
    } catch (error) {
      throw 'No existe el usuario'
    }
=======
  async get(id: number): Promise<User> {
    return await getRepository(User).findOneOrFail(id)
>>>>>>> dbf8d8699aa969feddc2d039fb9cacae8fc497a8
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
