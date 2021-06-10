import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Picture {

    constructor(init?: Partial<Picture>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
    pictureId: number

    @Column()
    url: string

    @CreateDateColumn()
    creationDate: Date

    static fromJson(PictureJson: string) {
        return Object.assign(new Picture(), PictureJson)
    }
}