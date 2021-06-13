import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Rol } from './Rol'

@Entity()
export class User {
  constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  userId!: number

  @Column({ type: 'varchar' })
  name!: string | null

  @Column({ type: 'varchar' })
  surname!: string

  @Column({ type: 'varchar' })
  email!: string

  @Column({ type: 'varchar' })
  birthdate!: Date

  @Column({ default: true })
  isActive!: boolean

  @Column()
  password!: string

  /*   @Column()
  rol!: Rol */

  @CreateDateColumn()
  creationDate!: Date

  static fromJson(UserJson: string): User {
    return Object.assign(new User(), UserJson)
  }
}
