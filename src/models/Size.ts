import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Size {

  constructor(init?: Partial<Size>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  sizeId!: number;

  @Column()
  description!: string;

   

}