import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guards/auth.guards"
import { CreatePlotDto } from "./dto/createPlot.dto"
import { PlotsService } from "./plots.service"
import { AddLaborDto } from "./dto/addLabor.dto"

@ApiTags('Plots')
@Controller('plots')
export class PlotsController {
    constructor(private plotsService: PlotsService){}
    @ApiBearerAuth()
    @Get('/user/:id')
    getPlotsById(@Param('id', ParseUUIDPipe) id: string ) {
        return this.plotsService.getPlotsById(id)
    }

    @ApiBearerAuth()
    @Get(':id')
    getPlotById(@Param('id', ParseUUIDPipe) id: string ){
        return this.plotsService.getPlotById(id)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('create')
    async createCategory(@Body() plot: CreatePlotDto){
        return await this.plotsService.createPlot(plot)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('addLabor')
    async addLabor(@Body() labor: AddLaborDto){
        return await this.plotsService.addLabor(labor)
    }
    
}