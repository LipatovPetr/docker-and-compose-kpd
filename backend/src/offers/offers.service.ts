import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import {
  isOfferAmountValid,
  isWishValidForOffer,
} from 'src/common/helpers/offers.helpers';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  async create(userId: number, createOfferDto: CreateOfferDto) {
    const user = await this.usersService.findOwn(userId);
    const wish = await this.wishesService.findOne(createOfferDto.itemId);

    isWishValidForOffer(userId, wish.owner.id);
    isOfferAmountValid(createOfferDto.amount, wish.price, wish.raised);

    const newOffer = this.offerRepository.create({
      ...createOfferDto,
      item: wish,
      user,
    });

    const updatedWish = await this.wishesService.update(
      wish.owner.id,
      wish.id,
      {
        raised: wish.raised + createOfferDto.amount,
      },
    );

    return this.offerRepository.save(newOffer);
  }

  async findAll() {
    return this.offerRepository.find();
  }

  findOne(id: number) {
    return this.offerRepository.findOneOrFail({ where: { id } });
  }
}
