import { UUID } from "crypto";
import { Column, Entity, ManyToOne, OneToMany, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplies } from "./supplies.entity";
import { User } from "src/users/entities/user.entity";
import { Labors } from "./labors.entity";
import SuppliesApplied from "./suppliesApplied.entity";

@Entity({ name: 'plots' })
export class Plots {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    surface: number;

    @Column()
    cereal: string;

    @ManyToOne(() => User, user => user.plots)
    user: User;

    @OneToMany(() => Labors, labor => labor.plot)
    labors: Labors[];

    @OneToMany(()=> SuppliesApplied, supply => supply.plot)
    supplies: SuppliesApplied[]
}
