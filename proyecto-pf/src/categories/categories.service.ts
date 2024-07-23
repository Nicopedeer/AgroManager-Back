import { Injectable } from "@nestjs/common"
import { CreateCategoryDto } from "./dto/createCategory.dto"
import { CategoriesRepository } from "./categories.repository"

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    getCategories (){
        return this.categoriesRepository.getCategories()
    }

    addCategories (){
        return this.categoriesRepository.addCategories()
    }

    async createCategory(category: CreateCategoryDto){
        return await this.categoriesRepository.createCategories(category)
    }
}