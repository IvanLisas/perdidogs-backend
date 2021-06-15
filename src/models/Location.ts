import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Location {
  constructor(init?: Partial<Location>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn() id!: number

  @Column({ type: 'varchar' }) x!: string

  @Column({ type: 'varchar' }) y!: string

  @CreateDateColumn() creationDate!: Date

  static fromJson(LocationJson: string): Location {
    return Object.assign(new Location(), LocationJson)
  }
}
