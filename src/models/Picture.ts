import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity()
export class Picture {
  constructor(init?: Partial<Picture>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() Id!: number

  @Column({ type: 'varchar' }) url!: string

  @CreateDateColumn() creationDate!: Date

  @ManyToOne(() => Post, (post) => post.Id) post!: Post

  static fromJson(PictureJson: string): Picture {
    return Object.assign(new Picture(), PictureJson)
  }
}
