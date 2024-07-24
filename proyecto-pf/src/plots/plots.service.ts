import { Injectable } from "@nestjs/common"
import { CreatePlotDto } from "./dto/createPlot.dto"
import { PlotsRepository } from "./plots.repository"
import { AddLaborDto } from "./dto/addLabor.dto"

@Injectable()
export class PlotsService {
    constructor(private plotsRepository: PlotsRepository) {}

    async getPlotById(id: string){
        return await this.plotsRepository.getPlotById(id)
    }

    async getPlotsById(id: string){
        return await this.plotsRepository.getPlotsById(id)
    }

    

    async createPlot(plot: CreatePlotDto){
        const {surface, cereal, user} = plot
        return await this.plotsRepository.createPlot(surface, cereal , user)
    }

    async addLabor(laborDto: AddLaborDto){
        const {labor, plotId} = laborDto
        return await this.plotsRepository.addLabor(labor, plotId)
    }
}