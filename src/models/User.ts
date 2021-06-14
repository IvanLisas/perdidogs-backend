import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { Rol } from './Rol'
import { UserStatus } from './UserStatus'

@Entity()
export class User {
  constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar'})
  firstName!: string | null

  @Column({ type: 'varchar' })
  lastName!: string

  @Column({ type: 'varchar' })
  email!: string

  @Column({ type: 'varchar' })
  birthdate!: Date

  @Column({ type:'boolean',default: true })
  isActive!: boolean

  @Column({ type: 'varchar'})
  password!: string

  @ManyToOne(()=>Rol, rol=>rol.id)
  rol!: Rol 

  @ManyToOne(()=>UserStatus, userStatus=>userStatus.id)
  userStatus!: UserStatus 

  @CreateDateColumn()
  creationDate!: Date

  static fromJson(UserJson: string): User {
    return Object.assign(new User(), UserJson)
  }
}
