import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards, UseInterceptors } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guards/auth.guards"
import { CreatePlotDto } from "./dto/createPlot.dto"
import { PlotsService } from "./plots.service"
import { AddLaborDto } from "./dto/addLabor.dto"
import { AddSupplyDto } from "./dto/addSupply.dto"
import { addLaborDecorator, addSupplyDecorator, createPlotDecorator, getPlotByIdDecorator, getSuppliesApplied, getUsersPlotsById } from "./plots.decorators"

@ApiTags('Plots')
@Controller('plots')
export class PlotsController {
    constructor(private plotsService: PlotsService){}

    @Get('/supplies/applied/:id')
    @getSuppliesApplied()
        async getSuppliesApplied(@Param('id', ParseUUIDPipe) id: string){
            return await this.plotsService.getSuppliesApplied(id)
        }
    
    
    @Get('/user/:id')
    @getUsersPlotsById()
    async getUsersPlotsById(@Param('id', ParseUUIDPipe) id: string ) {
        return await this.plotsService.getPlotsById(id)
    }

    
    @Get(':id')
    @getPlotByIdDecorator()
    async getPlotById(@Param('id', ParseUUIDPipe) id: string ){
        return await this.plotsService.getPlotById(id)
    }

    @Post('create/:id')
    @createPlotDecorator()
    async createPlot(@Param("id", ParseUUIDPipe) id: string, @Body() plot: CreatePlotDto){
        return await this.plotsService.createPlot(plot, id)
    }

    @Post('addLabor')
    @addLaborDecorator()
    async addLabor(@Body() labor: AddLaborDto){
        return await this.plotsService.addLabor(labor)
    }


    @Post('addSupply')
    @addSupplyDecorator()
    async addSupply(@Body() supply: AddSupplyDto){
        return await this.plotsService.addSupply(supply)
    }
}


