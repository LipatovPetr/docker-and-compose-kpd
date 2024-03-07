import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExtendedRequest } from 'src/common/types/common.types';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @HttpCode(200)
  findOwn(@Req() req: ExtendedRequest) {
    return this.usersService.findOwn(req.user.userId);
  }

  @Patch('me')
  @HttpCode(200)
  updateOwn(@Req() req: ExtendedRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOwn(req.user.userId, updateUserDto);
  }

  @Get('me/wishes')
  @HttpCode(200)
  getOwnWishes(@Req() req: ExtendedRequest) {
    return this.usersService.getOwnWishes(req.user.userId);
  }

  @Get(':username')
  @HttpCode(200)
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Get(':username/wishes')
  @HttpCode(200)
  findOneWishes(@Param('username') username: string) {
    return this.usersService.findOneWishes(username);
  }

  @Post('find')
  @HttpCode(201)
  async findMany(@Body() findUserDto: FindUserDto) {
    const users = await this.usersService.findMany(findUserDto);
    return users;
  }
}
