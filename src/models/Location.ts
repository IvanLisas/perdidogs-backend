import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {

  @PrimaryGeneratedColumn()
  locationId!: number;




}