import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Pet } from './Pet'

@Entity()
export class Alert {
  constructor(init?: Partial<Alert>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  alertId!: number

  @Column()
  pet!: Pet

  @Column()
  x1!: number

  @Column()
  x2!: number

  @Column()
  y1!: number

  @Column()
  y2!: number

  @Column({ default: true })
  isActive!: Boolean

  @CreateDateColumn()
  creationDate!: Date

  static fromJson(AlertJson: string) {
    return Object.assign(new Alert(), AlertJson)
  }
}
