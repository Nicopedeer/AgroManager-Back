import { Injectable } from "@nestjs/common"
import { CreatePlotDto } from "./dto/createPlot.dto"
import { PlotsRepository } from "./plots.repository"
import { AddLaborDto } from "./dto/addLabor.dto"
import { AddSupplyDto } from "./dto/addSupply.dto"

@Injectable()
export class PlotsService {
    constructor(private plotsRepository: PlotsRepository) {}

    async getPlotById(id: string){
        return await this.plotsRepository.getPlotById(id)
    }

    async getPlotsById(id: string){
        return await this.plotsRepository.getPlotsById(id)
    }

    

    async createPlot(plot: CreatePlotDto, id: string){
        const {surface, cereal} = plot
        return await this.plotsRepository.createPlot(surface, cereal , id)
    }

    async addLabor(laborDto: AddLaborDto){
        const {labor, plotId} = laborDto
        return await this.plotsRepository.addLabor(labor, plotId)
    }

    async addSupply(addSupplyDto: AddSupplyDto){
        const {supplyId, plotId, quantity} = addSupplyDto
        return await this.plotsRepository.addSupply(supplyId, plotId, quantity)
    }
}