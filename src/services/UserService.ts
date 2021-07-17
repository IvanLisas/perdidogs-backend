import { User } from '../models/User'
import { getRepository, Like } from 'typeorm'
import bcrypt from 'bcrypt'
import { EmailService } from './EmailService'
import { Bootstrap } from '../bootstrap/Bootstrap'
import { Role } from '../models/Role'

class UserService {
  relations = ['userStatus', 'post', 'post.pet', 'post.location', 'post.pictures', 'post.comments', 'post.comments.owner', 'post.pet.breed']
  async login(anEmail: string, aPassword: string): Promise<User> {
    try {
      const user = (await getRepository(User).findOneOrFail({
        relations: this.relations,
        where: {
          email: anEmail
        }
      })) as User
      if (await bcrypt.compare(aPassword, user.password)) return user
      else throw new Error('Contraseña incorrecta')
    } catch (error) {
      throw new Error('El email o la contraseña no son validos')
    }
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.findByEmail(email)
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
      relations: this.relations,
      where: {
        Id: id
      }
    })
  }

  async update(user: User): Promise<User> {
    return await getRepository(User).save(user)
  }

  async delete(user: User): Promise<User> {
    user.userStatus = Bootstrap.userStatusInactive
    return await getRepository(User).save(user)
  }

  async registrateUser(user: User): Promise<User> {
    if (await getRepository(User).findOne({ email: user.email })) throw new Error('Este mail ya está en uso')
    if (user.password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres')
    const salt = 10
    user.password = await bcrypt.hash(user.password, salt)
    user.role = await getRepository(Role).findOneOrFail({ Id: 1 })
    return await getRepository(User).save(user)
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<User> {
    const user = await getRepository(User).findOneOrFail({ Id: userId })
    const salt = 10
    if (await bcrypt.compare(oldPassword, user.password)) {
      user.password = await bcrypt.hash(newPassword, salt)
      return await getRepository(User).save(user)
    } else throw new Error('las passwords no coinciden')
  }
  
  async getByUsername(username: string): Promise<User[]> {
    return await getRepository(User).find({
      email: Like('%' + username + '%')
    })
  }

  async getUsersByStatus(userStatus: number): Promise<User[]> {
    return await getRepository(User).find({
      relations: this.relations,
      where: { userStatus: userStatus }
    })
  }
}

const userService = new UserService()

export default userService
