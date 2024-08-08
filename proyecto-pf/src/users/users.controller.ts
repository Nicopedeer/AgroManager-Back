import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put, UseGuards, Query, ParseIntPipe, BadRequestException, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { changePasswordDecorator, deleteUserDecorator, getAllUsersDecorator, getUserByIdDecoractor, getUserDecorator, updateUserDecorator } from './user.decorators';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { query, Response } from 'express';

const FrontPORT = process.env.FRONT_port

@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  

  @Get("getall")
  @getAllUsersDecorator()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get()
  @getUserDecorator()
  getUsersPage(@Query("page") page: string = "1", @Query("limit") limit: string = "5") {
    return this.usersService.getUsersPage(Number(page), Number(limit))
  }

  @Get("premium/monthly/:id")
  @ApiExcludeEndpoint()
  makeUserPremiumMonthly(@Param("id", ParseUUIDPipe) id: UUID, @Query() payment: any, @Res() res: Response) {
    if (payment.status === "approved") {
      this.usersService.makeUserPremiumMonthly(id)
      return res.redirect(`https://agromanager.vercel.app/subscriptions/accept-subscription`)
    } else {throw new BadRequestException("hubo un error con el metodo de pago")}
  }

  @Get("premium/yearly/:id")
  @ApiExcludeEndpoint()
  makeUserPremiumYearly(@Param("id", ParseUUIDPipe) id: UUID, @Query() payment: any, @Res() res: Response) {
    if (payment.status === "approved") {
      this.usersService.makeUserPremiumYearly(id)
      return res.redirect(`https://agromanager.vercel.app/subscriptions/accept-subscription`)
    } else {throw new BadRequestException("hubo un error con el metodo de pago")}
  }

  @Get("premium/freetrial/:id")
  freeTrial(@Param("id", ParseUUIDPipe)id: UUID) {
    return this.usersService.freeTrial(id)
    // return res.redirect(`https://agromanager.vercel.app/subscriptions/accept-subscription`)
  }

  @Get(':id')
  @getUserByIdDecoractor()
  getUserById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.getUserById(id);
  }

  @Put("password/:id")
  @changePasswordDecorator()
  changePassword(@Param("id", ParseUUIDPipe) id: UUID, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePasword(id, changePasswordDto)
  }

  @Put("unban/:id")
  unBanUser(@Param("id", ParseUUIDPipe) id: UUID) {
    return this.usersService.unBanUser(id)
  }

  @Put(':id')
  @updateUserDecorator()
  updateUser(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete("ban/:id")
  banUser(@Param("id", ParseUUIDPipe) id: UUID) {
    return this.usersService.banUser(id)
  }

  @Delete(':id')
  @deleteUserDecorator()
  deleteUser(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.deleteUser(id);
  }
}
