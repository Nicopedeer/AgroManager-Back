import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guards/auth.guards"
import { CreateSupplyDto } from "./dto/createSupply.dto"
import { SuppliesService } from "./supplies.service"
import { UpdateSupplyDto } from "./dto/updateSupply.dto"
import { createSupplyDecorator, getSuppliesByUserIdDecorator, updateSupplyDecorator } from "./supplies.decorator"
import { UUID } from "crypto"

@ApiTags('Supplies')
@Controller('supplies')
export class SuppliesController {
    constructor(private suppliesService: SuppliesService){}
    
    @Get(':id')
    @getSuppliesByUserIdDecorator()
    async getSuppliesByUserId(@Param('id', ParseUUIDPipe) id: string) {
        return await this.suppliesService.getSuppliesByUserId(id)
    }

    async getSuppliesByCategory(@Param() categoryId: string) {
        return await this.suppliesService.getSuppliesByCategory(categoryId)
    }

    
    @Post('create/:id')
    @createSupplyDecorator()
    async createSupply(@Param("id", ParseUUIDPipe) id: string, @Body() supply: CreateSupplyDto){
        return await this.suppliesService.createSupply(supply, id)
    }
    @Put(':id')
    @updateSupplyDecorator()
    async updateSupply(@Param('id', ParseUUIDPipe) id: string, @Body() supply : UpdateSupplyDto) {
        return await this.suppliesService.updateSupply(id, supply)
    }

    
}