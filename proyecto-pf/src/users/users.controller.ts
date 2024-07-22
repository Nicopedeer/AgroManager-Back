import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesDecorator } from 'src/auth/guards/neededroles.decorator';
import { roleGuard } from 'src/auth/guards/roles.guard';
import { RolesEnum } from './entities/roles.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("uwu")
  @RolesDecorator(RolesEnum.ADMIN)
  @UseGuards(AuthGuard, roleGuard)
  pruebaRancia() {
    return "uwu"
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.getUserById(id);
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
