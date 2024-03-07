import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ExtendedRequest } from 'src/common/types/common.types';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @HttpCode(201)
  create(@Req() req: ExtendedRequest, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(req.user.userId, createOfferDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.offersService.findOne(id);
  }
}
