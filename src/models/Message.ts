import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Chat } from './Chat'
import { User } from './User'

@Entity()
export class Message {
  constructor(init?: Partial<Message>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @ManyToOne(() => User, (user) => user.Id)
  sender!: User

  @ManyToOne(() => User, (user) => user.Id)
  adressee!: User

  @ManyToOne(() => Chat, (chat) => chat.messageList)
  chat!: Chat

  @Column({ type: 'varchar' })
  body!: string

  @CreateDateColumn()
  creationDate!: Date

  static fromJson(MessageJson: string): Message {
    return Object.assign(new Message(), MessageJson)
  }
}
