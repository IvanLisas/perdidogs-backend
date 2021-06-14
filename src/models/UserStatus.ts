import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserStatus {
  constructor(init?: Partial<UserStatus>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' })
  description!: string

  static fromJson(UserStatusJson: string) {
    return Object.assign(new UserStatus(), UserStatusJson)
  }
}
