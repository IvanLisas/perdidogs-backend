import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToOne, OneToMany, JoinColumn, ManyToMany } from 'typeorm'
import { Alert } from './Alert'
import { Comment } from './Comment'
import { Location } from './Location'
import { Pet } from './Pet'
import { Picture } from './Picture'
import { PostStatus } from './PostStatus'
import { User } from './User'

@Entity()
export class Post {
  constructor(init?: Partial<Post>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar', nullable: true })
  title!: string

  @Column({ type: 'varchar' })
  description!: string

  @CreateDateColumn()
  creationDate!: Date

  @ManyToOne(() => User, (user) => user.Id, { nullable: false })
  owner!: User

  @CreateDateColumn()
  endDate!: Date

  @OneToMany(() => Picture, (picture) => picture.post, { nullable: true, cascade: true })
  pictures?: Picture[]

  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true, cascade: true })
  comments?: Comment[]

  @OneToOne(() => Location, (location) => location.Id, { nullable: false, cascade: true })
  @JoinColumn()
  location?: Location

  //TODO: SE PUEDE CREAR UN POST SIN MASCOTA.
  @OneToOne(() => Pet, (pet) => pet.Id, { nullable: false, cascade: true })
  @JoinColumn()
  pet!: Pet

  @ManyToOne(() => PostStatus, (postStatus) => postStatus.Id, { nullable: false })
  postStatus!:PostStatus

  @ManyToMany(() => Alert, alert => alert.posiblePostAlerts)
  posibleAlertPost?: Alert[]

  static fromJson(postJson: string): Post {
    return Object.assign(new Post(), postJson)
  }

  // @ManyToOne(() => PostStatus, (postStatus) => postStatus.Id, {nullable: false})
  // status!:PostStatus

  // static fromJson(postJson: any) {
  //   return Object.assign(new Post(), postJson, {
  //   pet: postJson.pet ? Pet.fromJson(postJson.pet) : null,
  //   location: postJson.location ? Location.fromJson(postJson.location) : null,
  //   pictures: postJson.pictures ? postJson.pictures.map(pictures => pictures.fromJson(pictures)) :null,
  //   user: postJson.user ? User.fromJson(postJson.user) : null,
  //   status: postJson.status ? PostStatus.fromJson(postJson.status) : null,
  // })}

    /* 
  validate() {
    if (!this.description || !this.creationDate || !this.endDate || !this.pet) {
      throw 'Publicacion inválida'
    } */
  //}
}
