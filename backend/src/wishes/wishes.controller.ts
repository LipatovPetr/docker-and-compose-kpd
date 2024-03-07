import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ExtendedRequest } from 'src/common/types/common.types';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Public()
  @Get()
  @HttpCode(200)
  findOwn() {
    return this.wishesService.findLast();
  }

  @Public()
  @Get('last')
  @HttpCode(200)
  findLast() {
    return this.wishesService.findLast();
  }

  @Public()
  @Get('top')
  @HttpCode(200)
  findTop() {
    return this.wishesService.findTop();
  }

  @Post()
  @HttpCode(201)
  create(@Req() req: ExtendedRequest, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user.userId, createWishDto);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wishesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() req: ExtendedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return this.wishesService.update(req.user.userId, id, updateWishDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Req() req: ExtendedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.wishesService.remove(req.user.userId, id);
  }

  @Post(':id/copy')
  @HttpCode(201)
  copyWish(@Req() req: ExtendedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.wishesService.copyWish(id, req.user.userId);
  }
}
