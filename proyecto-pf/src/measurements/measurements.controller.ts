import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guards/auth.guards"
import { CreateMeasurementDto } from "./dto/createMeasurement.dto"
import { MeasurementsService } from "./measurements.service"
import { createMeasurementDecorator, getMeasurementsDecorator } from "./measurements.decorator"

@ApiTags('Measurements')
@Controller('measurments')
export class MeasurementsController {
    constructor(private measurementsService: MeasurementsService){}
    

    @getMeasurementsDecorator()
    @Get()
    async getMeasurements() {
        return await this.measurementsService.getMeasurements()
    }

    @createMeasurementDecorator()
    @Post('create')
    async createMeasurement(@Body() measurement: CreateMeasurementDto){
        return await this.measurementsService.createMeasurements(measurement)
    }
    
}