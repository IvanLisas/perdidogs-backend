import { getRepository } from 'typeorm'
import userRepo from '../repos/UserRepo'
import { User } from '../models/User'

export class UserService {
  async login(anEmail: string, aPassword: string): Promise<User> {
    try {
      return await userRepo.findOneOrFail({ email: anEmail, password: aPassword })
    } catch (error) {
      throw 'Credenciales incorrectas'
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      return await userRepo.findOneOrFail(user)
    } catch (error) {
      throw 'Credenciales incorrectas'
    }
  }

  async deleteUser(user: User): Promise<User> {
    try {
        user.isActive=false
        return await userRepo.save(user)
    } catch (error) {
        throw 'Credenciales incorrectas'
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
        return await userRepo.save(user)
    } catch (error) {
        throw 'Credenciales incorrectas'
    }
  }
}
