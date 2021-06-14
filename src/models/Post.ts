import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToOne, OneToMany } from 'typeorm'
import { Comment } from './Comment'
import { PostStatus } from './PostStatus'
import { Location } from './Location'
import { Pet } from './Pet'
import { Picture } from './Picture'
import { User } from './User'
import { Breed } from './Breed'
import { Size } from './Size'

@Entity()
export class Post {
  constructor(init?: Partial<Post>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() 
  id!: number

  @Column({ type: 'varchar'}) 
  description!: string

  @CreateDateColumn() 
  creationDate!: Date

  @ManyToOne(()=>User, user=>user.id)
  owner!: User

  @CreateDateColumn()
  endDate!: Date

  @ManyToOne(()=>PostStatus, PostStatus=>PostStatus.id)
  status!: PostStatus

  @OneToMany(()=>Picture, picture=>picture.post)
  pictures!: Picture[]

  @OneToOne(()=>Location, location=>location.id)
  location!: Location

  @OneToOne(()=>Pet, pet=>pet.id)
  pet!: Pet

  validate() {
    if (!this.description || !this.status || !this.pictures || !this.creationDate || !this.endDate || !this.location || !this.pet) {
      throw 'Publicacion inválida'
    }
  }

  static fromJson(postJson: string) {
    return Object.assign(new Post(), postJson)
  }
}
