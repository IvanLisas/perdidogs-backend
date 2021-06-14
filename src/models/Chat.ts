import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { User } from './User'
import { Message } from './Message'

@Entity()
export class Chat {
  constructor(init?: Partial<Chat>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  owner!: User 

  @OneToMany(()=>Message, message=>message.id)
  messageList!: Message[]
  
  @CreateDateColumn()
  creationDate!: Date

  static fromJson(MessageJson: string): Chat {
    return Object.assign(new Chat(), MessageJson)
  }
}
