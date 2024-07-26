import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Measurements } from "src/entities/measurements.entity";
import { MeasurementsController } from "./measurements.controller";
import { MeasurementsService } from "./measurements.service";
import { MeasurementsRepository } from "./measurements.repository";



@Module({
  imports: [TypeOrmModule.forFeature([Measurements])],
  controllers: [MeasurementsController],
  providers: [MeasurementsService, MeasurementsRepository],
})
export class MeasurementsModule {}