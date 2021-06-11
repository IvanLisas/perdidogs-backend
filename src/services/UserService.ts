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
}
