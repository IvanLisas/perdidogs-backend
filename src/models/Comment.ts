import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post'

@Entity()
export class Comment {
  constructor(init?: Partial<Comment>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar'})
  text!: string

  @CreateDateColumn()
  creation!: Date

  @ManyToOne(() => Post, (post) => post.Id)
  post!: Post

  static fromJson(PictureJson: string): Comment {
    return Object.assign(new Comment(), PictureJson)
  }
}
