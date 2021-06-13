import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Color {
  constructor(init?: Partial<Color>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  furColorId!: number

  @Column({ type: 'varchar'})
  description!: string
}
