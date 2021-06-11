import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Location {
  constructor(init?: Partial<Location>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() locationId!: number

  @Column() x!: string

  @Column() y!: string

  @CreateDateColumn() creationDate!: Date

  static fromJson(LocationJson: string) {
    return Object.assign(new Location(), LocationJson)
  }
}
