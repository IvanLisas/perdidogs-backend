import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { Rol } from './Rol'

@Entity()
export class User {
  constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  userId!: number

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

  @ManyToOne(()=>Rol, rol=>rol.rolId)
  rol!: Rol 

  @CreateDateColumn()
  creationDate!: Date

  static fromJson(UserJson: string): User {
    return Object.assign(new User(), UserJson)
  }
}
