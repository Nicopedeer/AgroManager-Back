import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Labors } from "src/entities/labors.entity";
import { Plots } from "src/entities/plots.entity";
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
        private readonly laborsRepository: Repository<Labors>
    ){}

    async getPlotById(id:string){
        return await this.plotsRepository.findOne({where:{id: id}, relations:{labors: true}})
    }

    async getPlotsById(id: string){
        const userFound = await this.usersRepository.findOne({where: {id: id}})
        return await this.plotsRepository.find({where:{user : userFound } , relations: {labors: true}})
    }

    async createPlot(surface: number, cereal: string, user: string){
        const userPlot = await this.usersRepository.findOne({where:{id : user}})
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

}