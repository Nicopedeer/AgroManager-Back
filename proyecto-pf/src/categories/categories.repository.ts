import { BadRequestException, Injectable } from '@nestjs/common';
import * as categories from '../utils/categories.json'
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>
    ) {}

    async getCategories() {
        return await this.categoriesRepository.find();
    }

    async addCategories(){
        for (const element of categories) {
            await this.categoriesRepository
                .createQueryBuilder()
                .insert()
                .into(Categories)
                .values({ name: element.name })
                .orIgnore()
                .execute();
        }
        
        return 'Categorías cargadas'
    }

    async createCategories(category : CreateCategoryDto){
        const {name} = category
        const exist = await this.categoriesRepository.findOne({where:{
            name : name
        }})
        if(exist){
            throw new BadRequestException(`Ya existe la categoria con el nombre: ${name}`)
        }
        const newCategory = new Categories()
        newCategory.name = name
        return await this.categoriesRepository.save(newCategory)
    }
    }
