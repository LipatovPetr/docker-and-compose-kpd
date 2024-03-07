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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ExtendedRequest } from 'src/common/types/common.types';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @HttpCode(201)
  create(
    @Req() req: ExtendedRequest,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    return this.wishlistsService.create(req.user.userId, createWishlistDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wishlistsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Req() req: ExtendedRequest,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.wishlistsService.update(id, req.user.userId, updateWishlistDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Req() req: ExtendedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.wishlistsService.remove(id, req.user.userId);
  }
}
