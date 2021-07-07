import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { AlertStatus } from './AlertStatus'
import { Location } from './Location'
import { Pet } from './Pet'
import { User } from './User'

@Entity()
export class Alert {
  constructor(init?: Partial<Alert>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @ManyToOne(() => User, (user) => user.Id, { nullable: false })
  owner!: User

  @OneToOne(() => Pet, (pet) => pet.Id, { nullable: false, cascade: true })
  @JoinColumn()
  pet!: Pet

  @OneToOne(() => Location, (location) => location.Id, { nullable: false, cascade: true })
  @JoinColumn()
  location?: Location

  @CreateDateColumn()
  creationDate!: Date

  @ManyToOne(() => AlertStatus, (alertStatus) => alertStatus.Id)
  alertStatus!: AlertStatus

  static fromJson(AlertJson: string): Alert {
    return Object.assign(new Alert(), AlertJson)
  }
}