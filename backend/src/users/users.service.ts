import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashValue } from 'src/common/helpers/auth.helpers';
import { UpdateUserDto } from './dto/update-user.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { FindUserDto } from './dto/find-user.dto';
import {
  detectQueryType,
  handleUniqueConstraintError,
  hashPasswordIfProvided,
  removeUsernameIfUnchanged,
} from 'src/common/helpers/users.helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => WishesService))
    private readonly wishesService: WishesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password } = createUserDto;
      const hashedPassword = await hashValue(password);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      if (!newUser.about) {
        delete newUser.about;
      }
      return await this.userRepository.save(newUser);
    } catch (err) {
      handleUniqueConstraintError(err);
    }
  }

  async findOne(username: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect(['user.password'])
      .getOne();

    if (!user) {
      throw new BadRequestException(
        `User with username '${username}' does not exist.`,
      );
    }

    return user;
  }

  async findOwn(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException(`User id #'${id}' does not exist.`);
    }

    return user;
  }

  async updateOwn(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOwn(id);
      removeUsernameIfUnchanged(updateUserDto, user.username);
      await hashPasswordIfProvided(updateUserDto);

      await this.userRepository.update(id, updateUserDto);
      const updatedUser = await this.findOwn(id);

      return updatedUser;
    } catch (err) {
      handleUniqueConstraintError(err);
    }
  }

  getOwnWishes(id: number) {
    return this.wishesService.findMany({ owner: { id } });
  }

  async findOneWishes(username: string) {
    const user = await this.findOne(username);
    const usersWishes = await this.wishesService.findMany({
      owner: { id: user.id },
    });

    return usersWishes;
  }

  async findMany(findUserDto: FindUserDto) {
    const queryType = detectQueryType(findUserDto.query);

    const users = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.email')
      .where(
        queryType === 'email'
          ? { email: findUserDto.query }
          : { username: findUserDto.query },
      )
      .getMany();

    return users;
  }
}
