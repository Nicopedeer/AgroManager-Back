import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Supplies } from "src/entities/supplies.entity";
import { SuppliesController } from "./supplies.controller";
import { SuppliesService } from "./supplies.service";
import { SuppliesRepository } from "./supplies.repository";
import { Categories } from "src/entities/categories.entity";
import { Measurements } from "src/entities/measurements.entity";
import { User } from "src/users/entities/user.entity";
import { UsersRepository } from "src/users/users.repository";
import { CategoriesRepository } from "src/categories/categories.repository";
import { MeasurementsRepository } from "src/measurements/measurements.repository";
import { Role } from "src/users/entities/roles.entity";
import { AuthService } from "src/auth/auth.service";



@Module({
  imports: [TypeOrmModule.forFeature([Supplies, Categories, Measurements, User, Role])],
  controllers: [SuppliesController],
  providers: [SuppliesService, SuppliesRepository, UsersRepository, CategoriesRepository, MeasurementsRepository, AuthService],
})
export class SuppliesModule {}