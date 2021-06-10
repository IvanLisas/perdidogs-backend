import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Location {

    constructor(init?: Partial<Location>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    locationId: number

    @Column()
    x: string

    @Column()
    y: string

    @CreateDateColumn()
    creationDate: Date

    static fromJson(LocationJson: string) {
        return Object.assign(new Location(), LocationJson)
x}
}