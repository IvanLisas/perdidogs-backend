import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserStatus {

    constructor(init?: Partial<UserStatus>) {
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn()
  userStatusId!: number;

    @Column()
  description!: string;

    static fromJson(UserStatusJson: string) {
        return Object.assign(new UserStatus(), UserStatusJson)
}
}