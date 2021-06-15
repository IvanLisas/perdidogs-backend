import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Alert {
  constructor(init?: Partial<Alert>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  x1!: number

  @Column()
  x2!: number

  @Column()
  y1!: number

  @Column()
  y2!: number

  @CreateDateColumn()
  creationDate!: Date

  static fromJson(AlertJson: string): Alert {
    return Object.assign(new Alert(), AlertJson)
  }

  validate() {
    if (!this.x1 || !this.x2 || !this.y1 || !this.y2) {
      throw 'Coordenadas inválidas'
    }
  }
}
