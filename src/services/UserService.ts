import { User } from '../models/User'
import { Between, getRepository, Like } from 'typeorm'
import bcrypt from 'bcrypt'
import { EmailService } from './EmailService'
import { Bootstrap } from '../bootstrap/Bootstrap'
import { Role } from '../models/Role'
import { Filter } from '../models/Filter'
import dropDownService from './DropDownService'

class UserService {
  relations = [
    'userStatus',
    'post',
    'post.postStatus',
    'post.pet',
    'post.location',
    'post.pictures',
    'post.comments',
    'post.comments.owner',
    'post.pet.breed',
    'post.pet.color',
    'post.pet.furLength',
    'role',
    'post.pet.size'
  ]
  async login(anEmail: string, aPassword: string): Promise<User> {
    try {
      const user = (await getRepository(User).findOneOrFail({
        relations: this.relations,
        where: {
          email: anEmail,
          userStatus: 1
        }
      })) as User
      user.post = user.post.filter((x) => x.postStatus.Id == 1 || x.postStatus.Id == 3)
      if (await bcrypt.compare(aPassword, user.password)) return user
      else throw new Error('Contraseña incorrecta')
    } catch (error) {
      throw new Error('El email o la contraseña no son validos')
    }
  }

  async loginAdmin(anEmail: string, aPassword: string): Promise<User> {
    try {
      const user = (await getRepository(User).findOneOrFail({
        relations: this.relations,
        where: {
          email: anEmail,
          userStatus: 1,
          role:1
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
    const token = Math.floor(Math.random() * 999999)
    if (user != null) {
      const emailSender = new EmailService()
      emailSender.sendEmail(user, user.email, 'Ingrese este token para recuperar su contraseña ' + token)
      user.tempToken = token
      this.update(user)
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
    const result = await getRepository(User).findOneOrFail({
      relations: this.relations,
      where: {
        Id: id
      }
    })
    //result.post = result.post.filter((x) => x.postStatus.Id == 1 || x.postStatus.Id == 3|| x.postStatus.Id == 4)
    return result
  }

  async update(user: User): Promise<User> {
    return await getRepository(User).save(user)
  }

  async delete(user: User): Promise<User> {
    user.userStatus = await dropDownService.getUserStatusById(2)
    return await getRepository(User).save(user)
  }

  async registrateUser(user: User): Promise<User> {
    if (await getRepository(User).findOne({ email: user.email })) throw new Error('Este mail ya está en uso')
    if (user.password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres')
    const salt = 10
    user.password = await bcrypt.hash(user.password, salt)
    user.role = await getRepository(Role).findOneOrFail({ Id: 2 })
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

  async changePasswordWithToken(email: string, token: number, newPassWord: string): Promise<User> {
    const user = await getRepository(User).findOneOrFail({ email: email })
    const salt = 10
    if (token == user.tempToken) {
      user.password = await bcrypt.hash(newPassWord, salt)
      return await getRepository(User).save(user)
    } else throw new Error('las passwords no coinciden')
  }

  async getByUsername(username: string): Promise<User[]> {
    return await getRepository(User).find({
      email: Like('%' + username + '%')
    })
  }

  async getUsersByStatus(userStatus: number, filter: Filter): Promise<User[]> {
    let whereJson
    if (filter) {
      whereJson = { userStatus: userStatus, creationDate: Between(filter.dateFrom, filter.dateTo) }
    } else {
      whereJson = { userStatus: userStatus, creationDate: Between(new Date('1980-01-01'), new Date()) }
    }
    return await getRepository(User).find({
      relations: this.relations,
      where: whereJson
    })
  }
}

const userService = new UserService()

export default userService
