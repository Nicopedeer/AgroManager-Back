import { UUID } from "crypto";
import { Column, Entity, ManyToOne, OneToMany, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplies } from "./supplies.entity";
import { User } from "src/users/entities/user.entity";
import { Labors } from "./labors.entity";

@Entity({ name: 'plots' })
export class Plots {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    surface: number;

    @Column()
    cereal: string;

    @ManyToOne(() => User, user => user.plots)
    user: User;

    @OneToMany(() => Labors, labor => labor.plot)
    labors: Labors[];

    @ManyToMany(() => Supplies, supply => supply.plots)
    supplies: Supplies[];
}
