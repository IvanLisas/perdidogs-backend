import { EntityRepository, getCustomRepository, Repository } from 'typeorm'
import { User } from '../models/User'

@EntityRepository(User)
export class UserRepo extends Repository<User> {}
