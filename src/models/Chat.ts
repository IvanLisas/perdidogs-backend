import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
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

  @Column()
  contact!: User 

  @Column()
  messageList!: Message[]
  
  @CreateDateColumn()
  creationDate!: Date

  static fromJson(MessageJson: string): Chat {
    return Object.assign(new Chat(), MessageJson)
  }
}
