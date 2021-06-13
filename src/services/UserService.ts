import userRepo from '../repos/UserRepo'
import { User } from '../models/User'
import { getRepository } from 'typeorm'

class UserService {
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
      if (!user.name || !user.surname || !user.email || !user.password || !user.birthdate) throw 'Usuario inválido'
      return await getRepository(User).save(user)
    } catch (error) {
      throw error.message
    }
  }

  async deleteUser(user: User): Promise<User> {
    try {
      user.isActive = false
      if (!userRepo.find(user)) throw 'Usuario inválido'
      else return await userRepo.save(user)
    } catch (error) {
      throw 'Credenciales incorrectas'
    }
  }
}

const userService = new UserService()

export default userService
