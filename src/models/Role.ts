import { Column, Entity, PrimaryGeneratedColumn,} from 'typeorm'

@Entity()
export class Role {
  constructor(init?: Partial<Role>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar'})
  description!: string

  static fromJson(RoleJson: string) {
    return Object.assign(new Role(), RoleJson)
  }
}
