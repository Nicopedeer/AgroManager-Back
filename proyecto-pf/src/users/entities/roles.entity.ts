import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum RolesEnum {
  USER = "user",
  ADMIN = "admin"
}

@Entity({name: "roles"})
export class Role {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => User, user => user.roles)
    @JoinTable({
        name: 'usuario_rol',
      })
    users: User[]
}