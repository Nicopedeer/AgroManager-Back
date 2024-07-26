import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Labors } from "src/entities/labors.entity";
import { Plots } from "src/entities/plots.entity";
import { Supplies } from "src/entities/supplies.entity";
import SuppliesApplied from "src/entities/suppliesApplied.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlotsRepository {
    constructor(
        @InjectRepository(Plots)
        private readonly plotsRepository: Repository<Plots>,
        @InjectRepository(User)
        private readonly usersRepository : Repository<User>,
        @InjectRepository(Labors)
        private readonly laborsRepository: Repository<Labors>,
        @InjectRepository(Supplies)
        private readonly suppliesRepository : Repository<Supplies>,
        @InjectRepository(SuppliesApplied)
        private readonly suppliesAppliedRepository : Repository<SuppliesApplied>
    ){}

    async getPlotById(id:string){
        return await this.plotsRepository.findOne({where:{id: id}, relations:{labors: true, supplies: true}})
    }

    async getPlotsById(id: string){
        const userFound = await this.usersRepository.findOne({where: {id: id}})
        return await this.plotsRepository.find({where:{user : userFound } , relations: {labors: true, supplies: true}})
    }

    async createPlot(surface: number, cereal: string, id: string){
        const userPlot = await this.usersRepository.findOne({where:{id : id}})
        const newPlot = new Plots()
        newPlot.surface = surface,
        newPlot.cereal = cereal,
        newPlot.user = userPlot
        return await this.plotsRepository.save(newPlot)
    }

    async addLabor(labor: Partial<Labors>, id: string){
        const plot = await this.plotsRepository.findOne({where:{id:id}, relations: {labors: true}})
        const newLabor = new Labors()
        newLabor.name = labor.name
        newLabor.contractor = labor.contractor
        newLabor.price = labor.price
        newLabor.surface = labor.surface
        const savedLabor = await this.laborsRepository.save(newLabor)
        plot.labors.push(savedLabor)
        return await this.plotsRepository.save(plot)
        
    }

    async addSupply (supplyId: string, plotId: string, quantity: number){
        const supply = await this.suppliesRepository.findOne({where:{id:supplyId}})
        const plot = await this.plotsRepository.findOne({where:{id: plotId}, relations:{supplies: true}})
        if(quantity > supply.stock){
            throw new BadRequestException('No se posee suficiente stock')
        }
        supply.stock = (supply.stock - quantity)
        await this.suppliesRepository.save(supply)
        const newApplied = new SuppliesApplied
        newApplied.supply = supply
        newApplied.quantity = quantity
        const saved = await this.suppliesAppliedRepository.save(newApplied)
        plot.supplies.push(saved)
        await this.plotsRepository.save(plot)
        return this.suppliesAppliedRepository.findOne({where:{id: saved.id}, relations: {supply: true}})
    }

}