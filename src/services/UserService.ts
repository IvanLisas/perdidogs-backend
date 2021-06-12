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

  async getUser(id: number): Promise<User> {
    try {
      return await userRepo.findOneOrFail({ userId: id })
    } catch (error) {
      throw 'No existe el usuario'
    }
  }

  async saveUser(user: User): Promise<User> {
    try {
      return await userRepo.findOneOrFail(user)
    } catch (error) {
      throw 'Credenciales incorrectas'
    }
  }
}
