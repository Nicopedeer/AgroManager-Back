import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Categories } from "./categories.entity";
import { Measurements } from "./measurements.entity";
import { User } from "src/users/entities/user.entity";

@Entity({name : "supplies"})
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
    price: number

    @ManyToOne(() => Categories, category => category.supplies)
    @JoinColumn({name: 'category_id'})
    category: Categories

    @ManyToOne(() => Measurements, measurements => measurements.name)
    @JoinColumn({name: 'measurement_id'})
    measurement: Measurements

    @ManyToOne(() => User, users => users.supplies)
    @JoinColumn()
    userId: User;
}
