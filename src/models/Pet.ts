import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Breed } from './Breed'
import { Fur } from './Fur'
import { Size } from './Size'
@Entity()
export class Pet {
  constructor(init?: Partial<Pet>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() petId!: number
  @Column() name!: string
  @Column() sex!: string
  @Column() hasCollar!: boolean

  @ManyToOne((type) => Fur) @JoinColumn({ name: 'fur_id' }) fur!: Fur

  @ManyToOne((type) => Breed) @JoinColumn({ name: 'breed_id' }) breed!: Breed

  @ManyToOne((type) => Size) @JoinColumn({ name: 'size_id' }) size!: Size

  validate() {
    if (!this.petId || !this.name || !this.sex || !this.hasCollar) {
      throw 'Mascota inválida'
    }
  }
  static fromJson(petJson: string) {
    return Object.assign(new Pet(), petJson)
  }
}
