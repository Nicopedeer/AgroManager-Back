import { UUID } from "crypto";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.entity";
import { Supplies } from "src/entities/supplies.entity";
import { Plots } from "src/entities/plots.entity";



@Entity({name: "users"})
export class User {
    
    @PrimaryGeneratedColumn("uuid")
    id: UUID

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    surname: string

    @Column({nullable: false})
    phone: string

    @Column({nullable: false})
    placeName: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    password: string



    @ManyToMany(() => Role, role => role.users)
    roles: Role[]

    @Column({default: true})
    active: boolean

    @OneToMany(() => Supplies, supply => supply.userId)
    @JoinColumn({name: "supplies_id"})
    supplies: Supplies[]

    @OneToMany(() => Plots, plot => plot.id)
    @JoinColumn()
    plots : Plots[]
}
