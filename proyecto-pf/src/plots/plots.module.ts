import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Plots } from "src/entities/plots.entity";
import { PlotsController } from "./plots.controller";
import { PlotsService } from "./plots.service";
import { PlotsRepository } from "./plots.repository";
import { User } from "src/users/entities/user.entity";
import { UsersRepository } from "src/users/users.repository";
import { Role } from "src/users/entities/roles.entity";
import { Labors } from "src/entities/labors.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Plots, User, Role, Labors])],
  controllers: [PlotsController],
  providers: [PlotsService, PlotsRepository, UsersRepository],
})
export class PlotsModule {}