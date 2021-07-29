import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable, Column, getManager } from 'typeorm'
import { StatsFilter } from '../admin-module/models/StatsFilter'
import { AlertStatus } from './AlertStatus'
import { Location } from './Location'
import { Pet } from './Pet'
import { Post } from './Post'
import { User } from './User'

@Entity()
export class Alert {
  constructor(init?: Partial<Alert>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  Id!: number

  @Column({ type: 'varchar' })
  title!: string

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

  @ManyToMany(()=> Post, post => post.Id)
  @JoinTable({
    name: 'notifications',
    joinColumn: {
      name: 'alertId',
      referencedColumnName: 'Id',
    },
    inverseJoinColumn: {
      name: 'postId',
      referencedColumnName: 'Id',
    },
  })
  posiblePostAlerts?: Post[]

  static fromJson(AlertJson: string): Alert {
    return Object.assign(new Alert(), AlertJson)
  }
}