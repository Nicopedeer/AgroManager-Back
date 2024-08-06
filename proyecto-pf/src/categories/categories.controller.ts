import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guards/auth.guards"
import { RolesDecorator } from "src/auth/guards/neededroles.decorator"
import { roleGuard } from "src/auth/guards/roles.guard"
import { RolesEnum } from "src/users/entities/roles.entity"
import { CreateCategoryDto } from "./dto/createCategory.dto"
import { CategoriesService } from "./categories.service"
import { createCategoryDecorator, getCategoriesDecorator } from "./categories.decorator"

@ApiTags('Categorias')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}
    
    @Get()
    @getCategoriesDecorator()
    getCategories() {
        return this.categoriesService.getCategories()
    }

    
    @Post('create')
    @createCategoryDecorator()
    async createCategory(@Body() category: CreateCategoryDto){
        return await this.categoriesService.createCategory(category)
    }
    
}