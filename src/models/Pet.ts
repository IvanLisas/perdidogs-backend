import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Breed } from './Breed'
import { Color } from './Color'
import { FurLength } from './FurLength'
import { Size } from './Size'
@Entity()
export class Pet {
  constructor(init?: Partial<Pet>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar', default: '' })
  name?: string

  @Column({ type: 'varchar', default: '' })
  sex?: string

  @Column({ type: 'boolean', default: false })
  hasCollar!: boolean

  @ManyToOne(() => Breed, (breed) => breed.Id)
  breed!: Breed

  @ManyToOne(() => Size, (size) => size.Id)
  size!: Size

  @Column({ type: 'boolean', default: true })
  isActive!: boolean

  @ManyToOne(() => Color, (color) => color.Id)
  color!: Color

  @ManyToOne(() => FurLength, (length) => length.Id)
  furLength!: FurLength

  validate() {
    if (!this.Id || !this.name || !this.sex || !this.hasCollar) {
      throw 'Mascota inválida'
    }
  }
  static fromJson(petJson: string): Pet {
    return Object.assign(new Pet(), petJson)
  }
}
