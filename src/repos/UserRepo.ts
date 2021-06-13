import { EntityRepository, Repository } from 'typeorm'
import { User } from '../models/User'

@EntityRepository(User)
export class UserRepo extends Repository<User> {}

const userRepo = new UserRepo()

export default userRepo
