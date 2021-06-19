import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm'
import { Chat } from './Chat'
import { Post } from './Post'
import { Rol } from './Rol'

@Entity()
export class User {
  constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar' })
  firstName!: string | null

  @Column({ type: 'varchar' })
  lastName!: string

  @OneToMany(() => Post, (post) => post.owner, { nullable: false })
  @JoinColumn()
  post!: Post[]

  @Column({ type: 'varchar' })
  email!: string
  //TODO
  /*   @Column({ type: 'varchar' })
  birthdate!: Date */

  @Column({ type: 'boolean', default: true })
  isActive!: boolean

  @Column({ type: 'varchar' })
  password!: string

  @ManyToOne(() => Rol, (rol) => rol.Id)
  rol!: Rol

  @OneToMany(() => Chat, (chat) => chat.Id)
  chat!: Chat[]

  // @ManyToOne(() => UserStatus, (userStatus) => userStatus.Id)
  // userStatus!: UserStatus

  

  @CreateDateColumn()
  creationDate!: Date

  static fromJson(UserJson: string): User {
    return Object.assign(new User(), UserJson)
  }
}
