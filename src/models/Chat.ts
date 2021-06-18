import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User'
import { Message } from './Message'

@Entity()
export class Chat {
  constructor(init?: Partial<Chat>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @ManyToOne(() => User, (user) => user.Id, {nullable: false})
  owner!: User

  @ManyToOne(() => User, (user) => user.Id, {nullable: false})
  owner2!: User

  @OneToMany(() => Message, (message: Message) => message.chat, {nullable: true, cascade: true })
  messageList!: Message[]

  @CreateDateColumn()
  creationDate!: Date

  static fromJson(MessageJson: string): Chat {
    return Object.assign(new Chat(), MessageJson)
  }
}
