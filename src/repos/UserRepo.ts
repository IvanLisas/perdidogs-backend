import { EntityRepository, Repository } from 'typeorm'
import { User } from '../models/User'

@EntityRepository(User)
export class UserRepo extends Repository<User> {

  async allUsers() {
    try {
      return await this.find()
    } catch (e) {
      console.log(e)
    }
  }

  async login(anEmail: string, aPassword: string) {
    try {
      let user: User = await this.findOneOrFail({ email: anEmail })
      if (user.password != aPassword) {
        throw 'Credenciales incorrectas'
      }
      return user
    } catch (error) {
      throw 'Credenciales incorrectas'
    }
  }

  async searchById(id: number) {
    return await this.findOneOrFail(id)
  }

  async searchByEmail(posibleEmail: string) {
    let user: User = await this.findOneOrFail({ email: posibleEmail })
    return user
  }

  async anyUsers() {
    try {
      return (await this.count()) == 0
    } catch (e) {
      console.log(e)
    }
  }

  async saveUser(user: User) {
    try {
      await this.save(user)
    } catch (e) {
      console.log(e)
    }
  }

}
