import { UUID } from "crypto";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplies } from "./supplies.entity";
import { User } from "src/users/entities/user.entity";
import { Labors } from "./labors.entity";

@Entity({name : 'plots'})
export class Plots{

    @PrimaryGeneratedColumn('uuid')
    id:UUID

    @Column()
    surface: number

    @Column()
    cereal: string

    @OneToMany(()=> User, userSupply => userSupply.supplies)
    @JoinColumn()
    supplies: Supplies[]

    @OneToMany(()=> Labors, labors => labors.id)
    @JoinColumn()
    labors: Labors[]
}