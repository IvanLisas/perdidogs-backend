import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
export class RepoUser extends Repository<User> {

    users = [User]

    async allUsers() {
        try {
            return await this.find()
        } catch (e) {
            console.log(e)
        }
    }

    async login(posible_email: string, posible_password: string) {
        try {
            let User: any = await this.findOneOrFail({ email: posible_email })
            if (User.contrasenia != posible_password) {
                throw "Credenciales incorrectas"
            }
            return User
        } catch (error) {
            throw "Credenciales incorrectas"
        }
    }

    async searchById(id: number) {
        return await this.findOneOrFail(id)
    }

    async searchByEmail(posible_email: string) {
        let User: User = await this.findOneOrFail({ email: posible_email })
        return User
    }

    async anyUsers() {
        try {
            return await this.count() == 0
        } catch (e) {
            console.log(e)
        }
    }

    async saveUser(User: User) {
        try {
            await this.save(User)
        } catch (e) {
            console.log(e)
        }
    }

}