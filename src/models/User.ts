import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Rol } from './Rol'

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

  @CreateDateColumn()
  creationDate!: Date


  static fromJson(UserJson: string): User {
    return Object.assign(new User(), UserJson)
  }
}
