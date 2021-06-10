import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Rol {

    constructor(init?: Partial<Rol>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
  rolId!: number;

    @Column()
  description!: string;

    static fromJson(RolJson: string) {
        return Object.assign(new Rol(), RolJson)
}
}