import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { mapUpdateDtoToQueryObject } from 'src/common/helpers/wishlists.helpers';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => WishesService))
    private readonly wishesService: WishesService,
  ) {}

  async create(id, createWishlistDto: CreateWishlistDto) {
    const user = await this.usersService.findOwn(id);
    const wishes = await this.wishesService.findMany({
      id: In(createWishlistDto.itemsId),
    });

    const newWishlist = await this.wishlistRepository.create({
      ...createWishlistDto,
      owner: user,
      items: wishes,
    });

    return this.wishlistRepository.save(newWishlist);
  }

  findAll() {
    return this.wishlistRepository.find();
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepository.findOneBy({ id });

    if (!wishlist) {
      throw new BadRequestException(`Wishlist with id ${id} not found`);
    }
    return wishlist;
  }

  async update(
    id: number,
    userId: number,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const updateQueryObject = {};
    const wishlist = await this.findOne(id);

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException("You cannot edit other people's wishlists.");
    }

    await mapUpdateDtoToQueryObject(
      this.wishesService,
      updateWishlistDto,
      updateQueryObject,
    );

    await this.wishlistRepository.save({ id, ...updateQueryObject });
    const updatedWishlist = await this.findOne(id);

    return updatedWishlist;
  }

  async remove(id: number, userId: number) {
    const wishlistToRemove = await this.findOne(id);

    if (!wishlistToRemove) {
      throw new BadRequestException(`Wishlist with id ${id} not found`);
    }

    if (wishlistToRemove.owner.id !== userId) {
      throw new ForbiddenException(
        "You cannot delete other people's wishlists",
      );
    }

    return this.wishlistRepository.remove(wishlistToRemove);
  }
}
