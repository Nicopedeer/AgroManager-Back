import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guards/auth.guards"
import { RolesDecorator } from "src/auth/guards/neededroles.decorator"
import { roleGuard } from "src/auth/guards/roles.guard"
import { RolesEnum } from "src/users/entities/roles.entity"
import { CreateCategoryDto } from "./dto/createCategory.dto"
import { CategoriesService } from "./categories.service"

@ApiTags('Categorias')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}
    @ApiBearerAuth()
    @Get()
    getCategories() {
        return this.categoriesService.getCategories()
    }

    @ApiBearerAuth()
    @RolesDecorator(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, roleGuard)
    @Post('create')
    async createCategory(@Body() category: CreateCategoryDto){
        console.log (category)
        return await this.categoriesService.createCategory(category)
    }
    
}