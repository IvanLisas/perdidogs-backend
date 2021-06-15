import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Color {
  constructor(init?: Partial<Color>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar' })
  description!: string
}
