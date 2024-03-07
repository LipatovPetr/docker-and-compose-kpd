import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { UsersService } from 'src/users/users.service';
import {
  isUserWishOwner,
  isWishEligibleToBeChanged,
} from 'src/common/helpers/wishes.helpers';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async create(userId: number, createWishDto: CreateWishDto) {
    const owner = await this.usersService.findOwn(userId);
    const newWish = await this.wishRepository.create({
      ...createWishDto,
      owner,
    });
    return this.wishRepository.save(newWish);
  }

  async findLast() {
    const lastWishes = await this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 12,
    });
    return lastWishes;
  }

  async findTop() {
    const topWishes = await this.wishRepository.find({
      order: { copied: 'DESC' },
      take: 12,
    });
    return topWishes;
  }

  async findOne(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'offers'],
    });

    if (!wish) {
      throw new BadRequestException(
        `No wish found with id #${id}. Please provide a valid wish id.`,
      );
    }

    return wish;
  }

  async findMany(query) {
    const wishes = await this.wishRepository.findBy(query);
    return wishes;
  }

  async update(userId: number, wishId: number, updateWishDto: UpdateWishDto) {
    const wish = await this.findOne(wishId);

    isUserWishOwner(wish.owner.id, userId);
    isWishEligibleToBeChanged(wish, updateWishDto);

    return this.wishRepository.update(wishId, updateWishDto);
  }

  async remove(userId: number, wishId: number) {
    const removedWish = await this.findOne(wishId);

    if (removedWish.owner.id !== userId) {
      throw new BadRequestException(
        `Cannot remove a wish that does not belong to the user with ID ${userId}`,
      );
    }

    this.wishRepository.delete(wishId);
    return removedWish;
  }

  async copyWish(wishId: number, userId: number) {
    const user = await this.usersService.findOwn(userId);
    const wishToCopy = await this.findOne(wishId);

    if (wishToCopy) {
      await this.update(wishToCopy.owner.id, wishToCopy.id, {
        copied: wishToCopy.copied + 1,
      });
    }

    const newWish = await this.wishRepository.create({
      name: wishToCopy.name,
      link: wishToCopy.link,
      image: wishToCopy.image,
      price: wishToCopy.price,
      description: wishToCopy.description,
      owner: user,
    });

    return this.wishRepository.save(newWish);
  }
}
