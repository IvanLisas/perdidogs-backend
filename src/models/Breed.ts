import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
 

@Entity()
export class Breed {

    constructor(init?: Partial<Breed>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    breedId!: number;
  
      @Column()
    description!: string;


}