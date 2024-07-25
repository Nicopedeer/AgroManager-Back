import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guards/auth.guards"
import { CreateSupplyDto } from "./dto/createSupply.dto"
import { SuppliesService } from "./supplies.service"
import { UpdateSupplyDto } from "./dto/updateSupply.dto"

@ApiTags('Supplies')
@Controller('supplies')
export class SuppliesController {
    constructor(private suppliesService: SuppliesService){}
    @ApiBearerAuth()
    @Get(':id')
    async getSuppliesByUserId(@Param('id', ParseUUIDPipe) id: string) {
        return await this.suppliesService.getSuppliesByUserId(id)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('create')
    async createSupply(@Body() supply: CreateSupplyDto){
        return await this.suppliesService.createSupply(supply)
    }
    @ApiBearerAuth()
    @Put(':id')
    async updateSupply(@Param('id', ParseUUIDPipe) id: string, @Body() supply : UpdateSupplyDto) {
        return await this.suppliesService.updateSupply(id, supply)
    }

    
}