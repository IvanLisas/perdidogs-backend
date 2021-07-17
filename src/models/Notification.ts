import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity("notifications")
export class Notification {
  constructor(init?: Partial<Notification>) {
    Object.assign(this, init)
  }

  @Column()
  @PrimaryColumn()
  alertId!: number;

  @Column()
  @PrimaryColumn()
  postId!: number;
 
  @Column({default:false})
  hasBeenRead!:boolean

  @Column({default:false})
  hasBeenRejected!:boolean

  static fromJson(AlertJson: string): Notification {
    return Object.assign(new Notification(), AlertJson)
  }
}