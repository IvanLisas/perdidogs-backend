import { Column, CreateDateColumn, Entity,  JoinColumn,  OneToMany,  PrimaryGeneratedColumn } from 'typeorm'
import { Alert } from './Alert'

@Entity()
export class AlertStatus {
  constructor(init?: Partial<AlertStatus>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar', default: '' })
  description!: string

  @OneToMany(() => Alert, (alert) => alert.alertStatus)
  @JoinColumn()
  alerts?: Alert[]

  @CreateDateColumn() creation!: Date
 
  @CreateDateColumn() endDate!: Date


  static fromJson(AlertJson: string): AlertStatus {
    return Object.assign(new AlertStatus(), AlertJson)
  }

}