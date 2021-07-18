import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class FurLength {
  constructor(init?: Partial<FurLength>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() Id!: number

  @Column({ type: 'varchar' }) description!: string
}
