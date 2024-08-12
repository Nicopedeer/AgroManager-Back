import { UUID } from "crypto";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.entity";
import { Supplies } from "src/entities/supplies.entity";
import { Plots } from "src/entities/plots.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    surname: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    placeName: string;

    @Column({unique: true, nullable: true})
    email: string;

    @Column({ nullable: true})
    password: string;

    @Column({nullable: true})
    googleId: string

    @ManyToMany(() => Role, role => role.users)
    roles: Role[];

    @Column({nullable: true})
    premiumExpiration: Date;

    @Column({nullable: true})
    premiumDate: Date


    @Column({default: false})
    freeTrialUsed: boolean;
    
    @Column({default: null, nullable: true})
    changeToday: boolean | null;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => Supplies, supply => supply.user)
    supplies: Supplies[];

    @OneToMany(() => Plots, plot => plot.user)
    plots: Plots[];
}
