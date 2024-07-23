import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesDecorator } from 'src/auth/guards/neededroles.decorator';
import { roleGuard } from 'src/auth/guards/roles.guard';
import { RolesEnum } from './entities/roles.entity';
import { User } from './entities/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  

  @Get("getall")
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get()
  getUsersPage(@Query("page") page: string = "1", @Query("limit") limit: string = "5") {
    return this.usersService.getUsersPage(Number(page), Number(limit))
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.getUserById(id);
  }

  @Put("password/:id")
  changePassword(@Param("id", ParseUUIDPipe) id: UUID, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePasword(id, changePasswordDto)
  }

  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.deleteUser(id);
  }
}
