import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Comment {
  constructor(init?: Partial<Comment>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  commentId!: number

  @Column()
  text!: string

  @CreateDateColumn()
  creation!: Date
}
