import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity()
export class Comment {
  constructor(init?: Partial<Comment>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar'})
  text!: string

  @CreateDateColumn()
  creation!: Date

  @ManyToOne(() => Post, (post) => post.Id)
  post!: Post

  @ManyToOne(() => User, (user) => user.Id)
  owner!: User

  static fromJson(PictureJson: string): Comment {
    return Object.assign(new Comment(), PictureJson)
  }
}
