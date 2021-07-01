import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Alert {
  constructor(init?: Partial<Alert>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', default: '' })
  description!: string

  static fromJson(AlertJson: string): Alert {
    return Object.assign(new Alert(), AlertJson)
  }

}