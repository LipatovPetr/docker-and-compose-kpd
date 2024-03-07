import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { FindUserDto } from './dto/find-user.dto';
export declare class UsersService {
    private userRepository;
    private readonly wishesService;
    constructor(userRepository: Repository<User>, wishesService: WishesService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(username: string): Promise<User>;
    findOwn(id: number): Promise<User>;
    updateOwn(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    getOwnWishes(id: number): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findOneWishes(username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findMany(findUserDto: FindUserDto): Promise<User[]>;
}
