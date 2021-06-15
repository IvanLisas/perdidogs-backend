import { Column, Entity,  PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { User } from './User'
import { Message } from './Message'

@Entity()
export class Chat {
  constructor(init?: Partial<Chat>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  chatId!: number

  @Column()
  user1!: User 

  @Column()
  user2!: User 

  @Column()
  messageList!: Message[]
  
  @CreateDateColumn()
  creationDate!: Date

  static fromJson(MessageJson: string): Chat {
    return Object.assign(new Chat(), MessageJson)
  }
}
