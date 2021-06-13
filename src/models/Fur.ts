import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Color } from './FurColor'
import { Length } from './Length'

@Entity()
export class Fur {
  constructor(init?: Partial<Fur>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @ManyToOne(()=>Color, color=>color.Id)
  color!: Color

  @ManyToOne(()=>Length, length=>length.Id)
  length!: Length
}
