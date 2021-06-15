import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToOne, OneToMany } from 'typeorm'
import { PostStatus } from './PostStatus'
import { Location } from './Location'
import { Pet } from './Pet'
import { Picture } from './Picture'
import { User } from './User'

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

  static fromJson(postJson: string): Post {
    return Object.assign(new Post(), postJson)}

  // static fromJson(postJson: any) {
  //   return Object.assign(new Post(), postJson, {
  //   pet: postJson.pet ? Pet.fromJson(postJson.pet) : null,
  //   location: postJson.location ? Location.fromJson(postJson.location) : null,
  //   pictures: postJson.pictures ? postJson.pictures.map(pictures => pictures.fromJson(pictures)) :null,
  //   user: postJson.user ? User.fromJson(postJson.user) : null,
  //   status: postJson.status ? PostStatus.fromJson(postJson.status) : null,
  // })}



}
