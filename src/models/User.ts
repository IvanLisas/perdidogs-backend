import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Rol } from "./Rol"
import { Alert } from "./Alert"
import { Post } from "./Post"

@Entity()
export class User {

    constructor(init?: Partial<User>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
  userId!: number

    @Column()
  name!: string

    @Column()
  surname!: string

    @Column()
  email!: string

    @Column()
  birthdate!: Date

    @Column({ default: 'Active' })
  status!: string

    @Column()
  password!: string

    @Column()
  rol!: Rol

    alerts = [Alert]

    posts = [Post]

    @CreateDateColumn()
  creationDate!: Date

    validate() {
        if (!this.name || !this.surname || !this.email || !this.password || !this.birthdate) {
            throw "Usuario inválido"
        }
    }

    static fromJson(UserJson: string) {
        return Object.assign(new User(), UserJson)
    }
}