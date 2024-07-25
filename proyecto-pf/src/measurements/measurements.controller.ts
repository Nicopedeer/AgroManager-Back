import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guards/auth.guards"
import { CreateMeasurementDto } from "./dto/createMeasurement.dto"
import { MeasurementsService } from "./measurements.service"

@ApiTags('Measurements')
@Controller('measurments')
export class MeasurementsController {
    constructor(private measurementsService: MeasurementsService){}
    @ApiBearerAuth()
    @Get()
    async getCategories() {
        return await this.measurementsService.getMeasurements()
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('create')
    async createCategory(@Body() measurement: CreateMeasurementDto){
        return await this.measurementsService.createMeasurements(measurement)
    }
    
}