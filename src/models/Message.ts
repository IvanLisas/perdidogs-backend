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

  @ManyToOne(() => User, (user) => user.id)
  sender!: User

  @ManyToOne(() => User, (user) => user.id)
  adressee!: User

  @Column({ type: 'varchar' })
  body!: string

  @CreateDateColumn()
  creationDate!: Date

  static fromJson(MessageJson: string): Message {
    return Object.assign(new Message(), MessageJson)
  }
}
