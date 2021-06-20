import { User } from '../models/User'
import { getRepository } from 'typeorm'
import bcrypt, { hash } from 'bcrypt'

class UserService {
  async login(anEmail: string, aPassword: string): Promise<User> {
    const user = await getRepository(User).findOneOrFail({ email: anEmail })
        if (await bcrypt.compare(aPassword,user.password)) {
      return await user
    } else throw new Error('contraseñas no coinciden')
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

  async registrateUser(user: User): Promise<User> {
    console.log(user)
    const userWithSameMail = await getRepository(User).findOne({ email: user.email })

    if (!userWithSameMail) {
      const salt = 10
      user.password = await bcrypt.hash(user.password, salt)
      console.log(user.password)
      return await this.save(user)
    }

    throw new Error('Este mail ya está en uso')
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<User> {
    const user = await getRepository(User).findOneOrFail({ Id: userId })
    //console.log(user)
    const salt = 10
    if (await bcrypt.compare(oldPassword, user.password)) {
      console.log(await bcrypt.hash(oldPassword, salt))
      //console.log(user.password)
      user.password = await bcrypt.hash(newPassword, salt)
      return await getRepository(User).save(user)
    } else throw new Error('las passwords no son iguales')
  }
}

const userService = new UserService()

export default userService
