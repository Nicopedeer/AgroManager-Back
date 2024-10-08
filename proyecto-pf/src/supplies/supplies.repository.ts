import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Measurements } from "src/entities/measurements.entity";
import { Supplies } from "src/entities/supplies.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateSupplyDto } from "./dto/createSupply.dto";
import { UpdateSupplyDto } from "./dto/updateSupply.dto";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class SuppliesRepository {
    constructor(
        @InjectRepository(Supplies)
        private readonly suppliesRepository: Repository<Supplies>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Measurements)
        private readonly measurementsRepository : Repository<Measurements>,
        @InjectRepository(Categories)
        private readonly categoriesRepository : Repository<Categories>,
        private readonly userRepository: UsersRepository

    ) {}

    async getSuppliesByUserId(id: string){
        const user = await this.usersRepository.findOne({where:{id:id}})
        if(!user){
            throw new NotFoundException(`No se encontro el usuario con el id:${id}`)
        }
        return await this.suppliesRepository.find({where: {user: user}, relations: {measurement: true, category: true, user: true}})
    }
    async getSupplyById(id:string){
        const supply = await this.suppliesRepository.findOne({where:{id:id}, relations:{measurement: true, category: true}})
        if(!supply)
            throw new NotFoundException(`No se encontro el insumo con el Id:${id}`)
    } 

    async getSuppliesByCategory(categoryId: string) {
        const findedCategory = await this.categoriesRepository.findOne({where: {id: categoryId}})
        if (!findedCategory) {
            throw new NotFoundException(`No se encontro la categoria con id:${categoryId}`)
        }
        return await this.suppliesRepository.find({where: {category: findedCategory}})
    }

    async createSupply(supply : CreateSupplyDto, id: string){
        const {category, measurement, ...rest} = supply
        const userFound = await this.usersRepository.findOne({where:{id: id}})
        if(!userFound){
            throw new NotFoundException(`No se encontro el usuario con id:${id}`)
        }
        const categoryFound = await this.categoriesRepository.findOne({where:{id: category}})
        if(!categoryFound){
            throw new NotFoundException(`No se encontro la categoria con id:${category}`)
        }
        const measurementFound = await this.measurementsRepository.findOne ({where: {id: measurement}})
        if(!measurementFound){
            throw new NotFoundException(`No se encontro la unidad de medida con id:${measurement}`)
        }
        const newSupply = await this.suppliesRepository.save(rest)
        newSupply.user = userFound
        newSupply.category = categoryFound
        newSupply.measurement = measurementFound
        await this.userRepository.updateChangeToday(userFound.id)
        return await this.suppliesRepository.save(newSupply)
    }

    async updateSupply(id: string, supply: UpdateSupplyDto){
        const updateResult = await this.suppliesRepository.update(id, supply);
        const foundSupply = await this.suppliesRepository.findOne({where: {id: id}, relations:{user: true}})
        if (!foundSupply) {throw new NotFoundException(`No se ha encontrado el insumo con id:${id}`)}

        Object.assign(foundSupply, supply)
        
        const updatedSupply = await this.suppliesRepository.save(foundSupply)
        await this.userRepository.updateChangeToday(foundSupply.user.id)
        return {message: "se ha actualizado el insumo", updatedSupply}
    }

}