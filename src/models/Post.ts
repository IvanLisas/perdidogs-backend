import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm'
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
  Id!: number

  @Column({ type: 'varchar' })
  description!: string

  @CreateDateColumn()
  creationDate!: Date

  @ManyToOne(() => User, (user) => user.Id, { nullable: false })
  @JoinColumn()
  owner!: User

  @CreateDateColumn()
  endDate!: Date

  // @ManyToOne(() => PostStatus, (postStatus) => postStatus.Id, {nullable: false})
  // status!:PostStatus

  @OneToMany(() => Picture, (picture) => picture.post, { nullable: true })
  pictures?: Picture[]

  @OneToOne(() => Location, (location) => location.Id, { nullable: true, cascade: true })
  @JoinColumn()
  location?: Location

  //TODO: SE PUEDE CREAR UN POST SIN MASCOTA.
  @OneToOne(() => Pet, (pet) => pet.Id, { nullable: true, cascade: true })
  @JoinColumn()
  pet!: Pet
/* 
  validate() {
    if (!this.description || !this.creationDate || !this.endDate || !this.pet) {
      throw 'Publicacion inválida'
    } */
  }

  static fromJson(postJson: string): Post {
    return Object.assign(new Post(), postJson)
  }

  // static fromJson(postJson: any) {
  //   return Object.assign(new Post(), postJson, {
  //   pet: postJson.pet ? Pet.fromJson(postJson.pet) : null,
  //   location: postJson.location ? Location.fromJson(postJson.location) : null,
  //   pictures: postJson.pictures ? postJson.pictures.map(pictures => pictures.fromJson(pictures)) :null,
  //   user: postJson.user ? User.fromJson(postJson.user) : null,
  //   status: postJson.status ? PostStatus.fromJson(postJson.status) : null,
  // })}
}
