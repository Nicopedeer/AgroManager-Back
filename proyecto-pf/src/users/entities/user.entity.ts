import { UUID } from "crypto";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.entity";



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

}
