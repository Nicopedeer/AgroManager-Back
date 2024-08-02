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

    async getSupplyById(id:string){
        return await this.suppliesRepository.getSupplyById(id)
    }

    async createSupply(supply: CreateSupplyDto, id: string){
        return await this.suppliesRepository.createSupply(supply, id)
    }

    async getSuppliesByCategory(category: string) {
        return await this.suppliesRepository.getSuppliesByCategory(category)
    }

    async updateSupply(id: string, supply : UpdateSupplyDto){
        return await this.suppliesRepository.updateSupply(id, supply)
    }
}