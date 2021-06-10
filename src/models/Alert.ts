import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Pet } from "./Pet"

@Entity()
export class Alert {

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    alertId: number

    @Column()
    pet: Pet

    @Column()
    x1: Number
    
    @Column()
    x2: Number
    
    @Column()
    y1: Number
    
    @Column()
    y1: Number

    @CreateDateColumn()
    creationDate: Date

    static fromJson(AlertJson: string) {
        return Object.assign(new Alert(), AlertJson)
    }
}