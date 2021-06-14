import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Chat } from './Chat'
import { User } from './User'

@Entity()
export class Message {
  constructor(init?: Partial<Message>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  sender!: User

  @Column()
  adressee!: User

  @Column({ type: 'varchar' })
  body!: string

  @CreateDateColumn()
  creationDate!: Date

  @Column()
  chat!: Chat

  static fromJson(MessageJson: string): Message {
    return Object.assign(new Message(), MessageJson)
  }
}
