import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm'
import { Chat } from './Chat'
import { Comment } from './Comment'
import { Post } from './Post'
import { Rol } from './Rol'
import { UserStatus } from './UserStatus'

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

  @Column({ type: 'varchar' })
  password!: string

  @ManyToOne(() => Rol, (rol) => rol.Id)
  rol!: Rol

  @OneToMany(() => Chat, (chat) => chat.Id)
  chat!: Chat[]

  @OneToMany(() => Comment, (comment) => comment.Id)
  comments!: Comment[]

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.Id)
  userStatus!: UserStatus

  @OneToMany(() => User, (user: User) => user)
  users?: User[]

  @CreateDateColumn()
  creationDate!: Date

  @Column({ type: 'varchar', nullable: true })
  avatar?: string

  static fromJson(UserJson: string): User {
    return Object.assign(new User(), UserJson)
  }
}
