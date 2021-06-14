import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
<<<<<<< HEAD

@Entity()
export class PostStatus {
=======
import { Post } from './Post'

@Entity()
export class PostStatus {
 

>>>>>>> develop
  constructor(init?: Partial<PostStatus>) {
    Object.assign(this, init)
  }

<<<<<<< HEAD
  @PrimaryGeneratedColumn() id!: number

  @Column({ type: 'varchar' }) description!: string

  @CreateDateColumn() creation!: Date

  @CreateDateColumn() EndDate!: Date
=======
  @PrimaryGeneratedColumn() Id!: number

  @Column({ type: 'varchar' }) description!: string

  @CreateDateColumn() creation!: Date

  @CreateDateColumn() EndDate!: Date

  static fromJson(PostStatusJson: string): PostStatus {
    return Object.assign(new PostStatus(), PostStatusJson)
  }
>>>>>>> develop
}

