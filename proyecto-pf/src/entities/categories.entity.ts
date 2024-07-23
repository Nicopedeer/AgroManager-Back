import { UUID } from "crypto";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplies } from "./supplies.entity";

@Entity({name: "categories"})
export class Categories{
    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @Column()
    name: string

    @OneToMany(() => Supplies, supply => supply.category)
    @JoinColumn()
    supplies: Supplies[]
}