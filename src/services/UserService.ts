import { getRepository } from 'typeorm'
import { UserRepo } from '../repos/UserRepo'
import { User } from '../models/User'


export class UserService {
    
    userRepo = getRepository(UserRepo)  

    async login(email: String, password: String) {
        await this.userRepo.login(email, password)
    }

}