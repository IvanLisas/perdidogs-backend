import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Breed } from './Breed'
import { Fur } from './Fur'
import { Size } from './Size'
@Entity()
export class Pet {
  constructor(init?: Partial<Pet>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() 
  id!: number
  
  @Column({ type: 'varchar'}) 
  name!: string
  
  @Column({ type: 'varchar'}) 
  sex!: string
  
  @Column({ type: 'boolean'}) 
  hasCollar!: boolean

  @ManyToOne(()=>Fur, fur=>fur.id) 
  fur!: Fur

  @ManyToOne(()=>Breed, breed=>breed.id)
  breed!: Breed

  @ManyToOne(()=>Size, size=>size.id) 
  size!: Size

  validate() {
    if (!this.id || !this.name || !this.sex || !this.hasCollar) {
      throw 'Mascota inválida'
    }
  }
  static fromJson(petJson: string) {
    return Object.assign(new Pet(), petJson)
  }
}
