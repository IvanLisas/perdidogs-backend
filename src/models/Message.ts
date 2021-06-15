import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Message {
  constructor(init?: Partial<Message>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  messageId!: number

  @Column()
  sender!: User

  @Column()
  adressee!: User

  @Column({ type: 'varchar'})
  body!: string

  @Column()
  isActive!: boolean

  @CreateDateColumn()
  creationDate!: Date

  validate() {
    if (!this.sender || !this.adressee || !this.body) {
      throw 'Mensaje vacío'
    }
  }

  static fromJson(MessageJson: string): Message {
    return Object.assign(new Message(), MessageJson)
  }
}
