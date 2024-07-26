import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guards/auth.guards"
import { CreatePlotDto } from "./dto/createPlot.dto"
import { PlotsService } from "./plots.service"
import { AddLaborDto } from "./dto/addLabor.dto"
import { AddSupplyDto } from "./dto/addSupply.dto"

@ApiTags('Plots')
@Controller('plots')
export class PlotsController {
    constructor(private plotsService: PlotsService){}
    @ApiBearerAuth()
    @Get('/user/:id')
    getUsersPlotsById(@Param('id', ParseUUIDPipe) id: string ) {
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
    async createPlot(@Param("id", ParseUUIDPipe) id: string, @Body() plot: CreatePlotDto){
        return await this.plotsService.createPlot(plot, id)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('addLabor')
    async addLabor(@Body() labor: AddLaborDto){
        return await this.plotsService.addLabor(labor)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('addSupply')
    async addSupply(@Body() supply: AddSupplyDto){
        return await this.plotsService.addSupply(supply)
    }
    
}