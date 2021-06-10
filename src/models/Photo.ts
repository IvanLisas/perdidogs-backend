import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
 

@Entity()
export class Photo {

    constructor(init?: Partial<Photo>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
  pothoId!: number;

    @Column()
  name!: string;

    @Column()
  url!: string;

  @CreateDateColumn()
  creationDate!: Date; 
 

}