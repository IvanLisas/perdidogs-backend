import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Color } from './FurColor'
import { Length } from './Length'

@Entity()
export class Fur {
  constructor(init?: Partial<Fur>) {
    Object.assign(this, init)
  }

  @ManyToOne((type) => Color)
  @JoinColumn({ name: 'id_FurColor' })
  furcolor!: Color

  @ManyToOne((type) => Length)
  @JoinColumn({ name: 'id_FurLength' })
  furLength!: Length
}
