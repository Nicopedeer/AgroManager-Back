import { Injectable } from "@nestjs/common"
import { CreateMeasurementDto } from "./dto/createMeasurement.dto"
import { MeasurementsRepository } from "./measurements.repository"

@Injectable()
export class MeasurementsService {
    constructor(private measurementsRepository: MeasurementsRepository) {}

    async getMeasurements (){
        return await this.measurementsRepository.getMeasurements()
    }

    async createMeasurements(measurement: CreateMeasurementDto){
        return await this.measurementsRepository.createMeasurements(measurement)
    }
}