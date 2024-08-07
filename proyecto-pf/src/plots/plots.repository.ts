import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Labors } from "src/entities/labors.entity";
import { Plots } from "src/entities/plots.entity";
import { Supplies } from "src/entities/supplies.entity";
import SuppliesApplied from "src/entities/suppliesApplied.entity";
import { User } from "src/users/entities/user.entity";
import { UsersRepository } from "src/users/users.repository";
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
        private readonly suppliesAppliedRepository : Repository<SuppliesApplied>,
        private readonly userRepository : UsersRepository
    ){}

    async getPlotById(id:string){
        const plot = await this.plotsRepository.findOne({where:{id: id}, relations:{labors: true, supplies: true}})
        if(!plot){
            throw new NotFoundException(`No se encontro el lote con id:${id}`)
        }
        return plot
    }

    async getSuppliesApplied(id:string){
        const suppliesApplied = await this.suppliesAppliedRepository.findOne({where:{id:id}, relations:{supply: true}})
        if(!suppliesApplied){
            throw new NotFoundException(`No se encontro el insumo con id:${id}`)
        }
        return suppliesApplied
    }

    async getPlotsById(id: string){
        const userFound = await this.usersRepository.findOne({where: {id: id}})
        if(!userFound){
            throw new NotFoundException(`No se encontro el usuario con id:${id}`)
        }
        return await this.plotsRepository.find({where:{user : userFound } , relations: {labors: true, supplies: true}})
    }

    async createPlot(surface: number, cereal: string, latitude: string, longitude: string, id: string){
        const userPlot = await this.usersRepository.findOne({where:{id : id}})
        if(!userPlot){
            throw new NotFoundException(`No se encontro el usuario con id:${id}`)
        }
        const newPlot = new Plots()
        newPlot.surface = surface,
        newPlot.cereal = cereal,
        newPlot.longitude = longitude
        newPlot.latitude = latitude
        newPlot.user = userPlot
        await this.userRepository.updateChangeToday(userPlot.id)
        return await this.plotsRepository.save(newPlot)
    }

    async addLabor(labor: Partial<Labors>, id: string){
        const plot = await this.plotsRepository.findOne({where:{id:id}, relations: {labors: true , user: true}})
        if(!plot){
            throw new NotFoundException(`No se encontro el lote con id:${id}`)
        }
        if(labor.surface > plot.surface){
            throw new BadRequestException(`No se puede aplicar un labor mayor que la superficie del lote:${plot.surface}`)
        }
        const newLabor = new Labors()
        newLabor.name = labor.name
        newLabor.contractor = labor.contractor
        newLabor.price = labor.price
        newLabor.surface = labor.surface
        const savedLabor = await this.laborsRepository.save(newLabor)
        plot.labors.push(savedLabor)
        await this.userRepository.updateChangeToday(plot.user.id)
        return await this.plotsRepository.save(plot)
        
    }

    async addSupply (supplyId: string, plotId: string, quantity: number){
        const supply = await this.suppliesRepository.findOne({where:{id:supplyId},})
        if(!supply){
            throw new NotFoundException(`No se encontro el insumo con id:${supplyId}`)
        }
        const plot = await this.plotsRepository.findOne({where:{id: plotId}, relations:{supplies: true, user: true}})
        if(!plot){
            throw new NotFoundException(`No se encontro el lote con id:${plotId}`)
        }
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
        await this.userRepository.updateChangeToday(plot.user.id)
        return this.suppliesAppliedRepository.findOne({where:{id: saved.id}, relations: {supply: true}})
    }

}