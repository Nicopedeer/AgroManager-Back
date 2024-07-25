import { UUID } from "crypto";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Supplies } from "./supplies.entity";
import { Plots } from "./plots.entity";

@Entity({name: "applied"})
export default class SuppliesApplied{

    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @Column()
    quantity: number

    @ManyToOne(() => Supplies, supply => supply)
    supply: Supplies

    @ManyToOne(()=> Plots, plot => plot.supplies)
    plot: Plots
}