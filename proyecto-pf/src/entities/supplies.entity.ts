import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Categories } from "./categories.entity";
import { Measurements } from "./measurements.entity";
import { User } from "src/users/entities/user.entity";
import { Plots } from "./plots.entity";

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

    @ManyToOne(() => Categories, category => category.supplies)
    category: Categories;

    @ManyToOne(() => Measurements, measurement => measurement.supplies)
    measurement: Measurements;

    @ManyToOne(() => User, user => user.supplies)
    user: User;

    @ManyToMany(() => Plots, plot => plot.supplies)
    @JoinTable({
        name: "plot_supplies", // Nombre de la tabla de unión
        joinColumn: { name: "supply_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "plot_id", referencedColumnName: "id" }
    })
    plots: Plots[];
}
