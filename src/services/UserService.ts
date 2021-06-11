import { getRepository } from 'typeorm'
import { UserRepo } from '../repos/UserRepo'
import { User } from '../models/User'


export class UserService {
    
    userRepo = getRepository(User)  

    async login(anEmail: string, aPassword: string) : Promise<User>{
        try {
            return await this.userRepo.findOneOrFail({ email: anEmail, password:aPassword })
          } catch (error) {
            throw 'Credenciales incorrectas'
          }
    }

    
    async newUser(user:User) : Promise<User>{
        try {
            return await this.userRepo.save(user)
          } catch (error) {
            throw 'Error al generar el nuevo usuario'
          }
    }

}



