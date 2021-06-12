import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Rol } from './Rol'
import { Alert } from './Alert'
import { Post } from './Post'

@Entity("USER")
export class User {
  constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  userId!: number

  @Column("first_name")
  name!: string

  @Column("last_name")
  surname!: string

  @Column("email")
  email!: string

  @Column("birthdate")
  birthdate!: Date

  @Column({ default: true })
  isActive!: boolean

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
      throw 'Usuario inválido'
    }
  }

  static fromJson(UserJson: string):User {
    return Object.assign(new User(), UserJson)
  }
  
}
