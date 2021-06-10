import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
 

@Entity()
export class PostStatus {

    constructor(init?: Partial<PostStatus>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
  postStatusId!: number;

    @Column()
  description!: string;

    @Column()
  creation!: Date;

    
    @Column()
  EndDate!: Date;

}