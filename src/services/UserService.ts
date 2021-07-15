import { User } from '../models/User'
import { getRepository } from 'typeorm'
import bcrypt, { hash } from 'bcrypt'
import { EmailService } from './EmailService'
import { Bootstrap } from '../bootstrap/Bootstrap'

class UserService {
  async login(anEmail: string, aPassword: string): Promise<User> {
    try {
      const user = await getRepository(User).findOneOrFail({
        relations: ['post', 'post.pet', 'post.location', 'post.pictures', 'post.comments', 'post.comments.owner', 'post.pet.breed'],
        where: {
          email: anEmail
        }
      })

      if (await bcrypt.compare(aPassword, user.password)) {
        return user
      } else throw new Error()
    } catch (error) {
      throw new Error('El email o la contraseña no son validos')
    }
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.findByEmail(email)
    console.log('USER: ', user)
    const link = 'localhost:19000/recover-password/:' + email
    if (user != null) {
      const emailSender = new EmailService()
      emailSender.sendEmail(user, user.email, 'Ingrese a este link para recuperar su contraseña ' + link)
    }
  }

  async findByEmail(anEmail: string): Promise<User> {
    return getRepository(User).findOneOrFail({
      where: {
        email: anEmail
      }
    })
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
    user.userStatus = Bootstrap.userStatusInactive
    return await getRepository(User).save(user)
  }

  async registrateUser(user: User): Promise<User> {
    if (!(await getRepository(User).findOne({ email: user.email }))) {
      const salt = 10
      user.password = await bcrypt.hash(user.password, salt)
      user.role.Id = 1
      console.log(user)
      return await getRepository(User).save(user)
    } else throw new Error('Este mail ya está en uso')
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<User> {
    const user = await getRepository(User).findOneOrFail({ Id: userId })
    const salt = 10
    if (await bcrypt.compare(oldPassword, user.password)) {
      user.password = await bcrypt.hash(newPassword, salt)
      return await getRepository(User).save(user)
    } else throw new Error('las passwords no son iguales')
  }

  async getUsersByStatus(userStatus: number): Promise<User[]> {
    return await getRepository(User).find({
      relations: ['userStatus'],
      where: { userStatus: userStatus }
    })
  }
}

const userService = new UserService()

export default userService
