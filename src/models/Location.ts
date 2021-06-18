import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Location {
  constructor(init?: Partial<Location>) {
    Object.assign(this, init)
  }

  static createNewLocation(x:number, y:number):Location{
    const location= new Location()
    location.x= x
    location.y= y
    return location
  }

  @PrimaryGeneratedColumn() Id!: number

  @Column({ type: 'float' }) x!: number

  @Column({ type: 'float' }) y!: number

  @CreateDateColumn() creationDate!: Date

  static fromJson(LocationJson: string): Location {
    return Object.assign(new Location(), LocationJson)
  }
}
