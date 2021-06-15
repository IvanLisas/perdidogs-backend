import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToOne, OneToMany } from 'typeorm'
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
  Id!: number

  @Column({ type: 'varchar'}) 
  description!: string

  @CreateDateColumn() 
  creationDate!: Date

  @ManyToOne(()=>User, user=>user.Id)
  owner!: User

  @CreateDateColumn()
  endDate!: Date

  @ManyToOne(()=>PostStatus, PostStatus=>PostStatus.Id)
  status!: PostStatus

  @OneToMany(()=>Picture, picture=>picture.post)
  pictures!: Picture[]

  @OneToOne(()=>Location, location=>location.Id)
  location!: Location

  @OneToOne(()=>Pet, pet=>pet.Id, {nullable: false})
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
