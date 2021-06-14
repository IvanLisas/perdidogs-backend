import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Breed {
  constructor(init?: Partial<Breed>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar'})
  description!: string
}
