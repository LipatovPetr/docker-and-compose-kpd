import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { UsersService } from 'src/users/users.service';
export declare class WishesService {
    private wishRepository;
    private readonly usersService;
    constructor(wishRepository: Repository<Wish>, usersService: UsersService);
    create(userId: number, createWishDto: CreateWishDto): Promise<Wish>;
    findLast(): Promise<Wish[]>;
    findTop(): Promise<Wish[]>;
    findOne(id: number): Promise<Wish>;
    findMany(query: any): Promise<Wish[]>;
    update(userId: number, wishId: number, updateWishDto: UpdateWishDto): Promise<import("typeorm").UpdateResult>;
    remove(userId: number, wishId: number): Promise<Wish>;
    copyWish(wishId: number, userId: number): Promise<Wish>;
}
