import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplies } from "./supplies.entity";

@Entity({ name: "measurements" })
export class Measurements {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    name: string;

    @OneToMany(() => Supplies, supply => supply.measurement)
    supplies: Supplies[];
}
