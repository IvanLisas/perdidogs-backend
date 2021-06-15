import { Column, Entity, PrimaryGeneratedColumn,} from 'typeorm'

@Entity()
export class Rol {
  constructor(init?: Partial<Rol>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar'})
  description!: string

  static fromJson(RolJson: string) {
    return Object.assign(new Rol(), RolJson)
  }
}
