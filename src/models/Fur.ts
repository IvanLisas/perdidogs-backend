import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Color } from './Color'
import { Length } from './Length'

@Entity()
export class Fur {
  constructor(init?: Partial<Fur>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Color, (color) => color.id)
  color!: Color

  @ManyToOne(() => Length, (length) => length.id)
  length!: Length

  static fromJson(FurJson: string): Fur {
    return Object.assign(new Fur(), FurJson)
  }
}
