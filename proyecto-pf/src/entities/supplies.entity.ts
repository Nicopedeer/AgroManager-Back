import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, OneToMany } from "typeorm";
import { Categories } from "./categories.entity";
import { Measurements } from "./measurements.entity";
import { User } from "src/users/entities/user.entity";
import { Plots } from "./plots.entity";
import SuppliesApplied from "./suppliesApplied.entity";


@Entity({ name: "supplies" })
export class Supplies {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    provider: string;

    @Column('int')
    stock: number;

    @Column('int')
    price: number;

    @Column({ nullable: true })
    imgUrl: string;

    @ManyToOne(() => Categories, category => category.supplies)
    category: Categories;

    @ManyToOne(() => Measurements, measurement => measurement.supplies)
    measurement: Measurements;

    @ManyToOne(() => User, user => user.supplies)
    user: User;

    @OneToMany(() => SuppliesApplied, supply => supply.supply)
    supplies: SuppliesApplied[]
}
