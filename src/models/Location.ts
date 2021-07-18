import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Location {
  constructor(init?: Partial<Location>) {
    Object.assign(this, init)
  }

  static createNewLocation(lat: number, long: number): Location {
    const location = new Location()
    location.lat = lat
    location.long = long
    return location
  }

  @PrimaryGeneratedColumn() Id!: number

  @Column({ type: 'float' }) lat!: number

  @Column({ type: 'float' }) long!: number

  @CreateDateColumn() creationDate!: Date

  static fromJson(LocationJson: string): Location {
    return Object.assign(new Location(), LocationJson)
  }
}
