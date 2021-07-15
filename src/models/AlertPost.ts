import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm'

@Entity("alert_post")
export class AlertPost {
  constructor(init?: Partial<AlertPost>) {
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

  static fromJson(AlertJson: string): AlertPost {
    return Object.assign(new AlertPost(), AlertJson)
  }
}