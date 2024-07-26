import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Measurements } from "src/entities/measurements.entity";
import { Supplies } from "src/entities/supplies.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateSupplyDto } from "./dto/createSupply.dto";
import { UpdateSupplyDto } from "./dto/updateSupply.dto";

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
        private readonly categoriesRepository : Repository<Categories>

    ) {}

    async getSuppliesByUserId(id: string){
        const user = await this.usersRepository.findOne({where:{id:id}})
        return await this.suppliesRepository.find({where: {user: user}, relations: {measurement: true, category: true, user: true}})
    }

    async getSuppliesByCategory(categoryId: string) {
        const findedCategory = await this.categoriesRepository.findOne({where: {id: categoryId}})
        if (!findedCategory) {throw new NotFoundException("no se ha podido encontrar la categoria")}
        return await this.suppliesRepository.find({where: {category: findedCategory}})
    }

    async createSupply(supply : CreateSupplyDto, id: string){
        const {category, measurement, ...rest} = supply
        const userFound = await this.usersRepository.findOne({where:{id: id}})
        const categoryFound = await this.categoriesRepository.findOne({where:{id: supply.category}})
        const measurementFound = await this.measurementsRepository.findOne ({where: {id: supply.measurement}})
        const newSupply = await this.suppliesRepository.save(rest)
        newSupply.user = userFound
        newSupply.category = categoryFound
        newSupply.measurement = measurementFound
        return await this.suppliesRepository.save(newSupply)
    }

    async updateSupply(id: string, supply: UpdateSupplyDto){
        const updateResult = await this.suppliesRepository.update(id, supply);
        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el usuario con ID ${id} o no se pudo actualizar.`);
        }
        const updatedSupply = await this.usersRepository.findOneBy({ id });
        if (!updatedSupply) {
            throw new BadRequestException(`No se encontró el usuario con ID ${id} después de la actualización.`);
        }

        return updatedSupply
    }

}