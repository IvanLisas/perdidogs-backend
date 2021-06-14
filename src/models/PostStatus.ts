import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { Post } from './Post'

@Entity()
export class PostStatus {
 

  constructor(init?: Partial<PostStatus>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() Id!: number

  @Column({ type: 'varchar' }) description!: string

  @CreateDateColumn() creation!: Date

  @CreateDateColumn() EndDate!: Date

  static fromJson(PostStatusJson: string): PostStatus {
    return Object.assign(new PostStatus(), PostStatusJson)
  }
}
