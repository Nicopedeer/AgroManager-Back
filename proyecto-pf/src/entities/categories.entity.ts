import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplies } from "./supplies.entity";

@Entity({ name: "categories" })
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    name: string;

    @OneToMany(() => Supplies, supply => supply.category)
    supplies: Supplies[];
}
