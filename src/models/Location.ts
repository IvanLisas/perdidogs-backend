import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Location {
  constructor(init?: Partial<Location>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() Id!: number

  @Column({ type: 'decimal'}) x!: number

  @Column({ type: 'decimal'}) y!: number

  @CreateDateColumn() creationDate!: Date

  static fromJson(LocationJson: string):Location {
    return Object.assign(new Location(), LocationJson)
  }
}
