 import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { User } from './User'

 @Entity()
 export class PostStatus {
    constructor(init?: Partial<PostStatus>) {
      Object.assign(this, init)
    }

    @PrimaryGeneratedColumn() Id!: number

    @Column({ type: 'varchar' }) description!: string

    @CreateDateColumn() creation!: Date
 
    @CreateDateColumn() EndDate!: Date

 }



export  enum Status {
  ACTIVA = 1,
  PENDIENTE = 2,
  CANCELADA = 3,
  FINALIZADA = 4,
  RESUELTO =5
}



