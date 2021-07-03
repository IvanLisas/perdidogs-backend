import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

 @Entity()
export class UserStatus {
  constructor(init?: Partial<UserStatus>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar' })
  description!: string

      
  @OneToMany(() => User, (user) => user.userStatus)
  @JoinColumn()
  user?: User[]
  
  static fromJson(UserStatusJson: string) {
    return Object.assign(new UserStatus(), UserStatusJson)
  }
}