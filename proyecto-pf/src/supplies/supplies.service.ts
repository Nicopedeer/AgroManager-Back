import { Injectable } from "@nestjs/common"
import { CreateSupplyDto } from "./dto/createSupply.dto"
import { SuppliesRepository } from "./supplies.repository"
import { UpdateSupplyDto } from "./dto/updateSupply.dto"

@Injectable()
export class SuppliesService {
    constructor(private suppliesRepository: SuppliesRepository) {}

    async getSuppliesByUserId(id: string){
        return await this.suppliesRepository.getSuppliesByUserId(id)
    }

    async createSupply(supply: CreateSupplyDto){
        return await this.suppliesRepository.createSupply(supply)
    }

    async updateSupply(id: string, supply : UpdateSupplyDto){
        await this.suppliesRepository.updateSupply(id, supply)
    }
}