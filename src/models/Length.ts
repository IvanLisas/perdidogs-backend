import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Length {
  constructor(init?: Partial<Length>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() lengthColorId!: number

  @Column({ type: 'varchar'}) description!: string
}
