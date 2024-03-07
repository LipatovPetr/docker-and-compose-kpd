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
    findLast(): Promise<{
        name: string;
        link: string;
        image: string;
        price: string;
        raised: string;
        copied: number;
        description: string;
        id: number;
        createdAt: string;
        updatedAt: string;
        owner: {
            username: string;
            about: string;
            avatar: string;
            email: string;
            id: number;
            createdAt: string;
            updatedAt: string;
        };
        offers: any[];
    }[]>;
    findTop(): Promise<{
        name: string;
        link: string;
        image: string;
        price: string;
        raised: string;
        copied: number;
        description: string;
        id: number;
        createdAt: string;
        updatedAt: string;
        owner: {
            username: string;
            about: string;
            avatar: string;
            email: string;
            id: number;
            createdAt: string;
            updatedAt: string;
        };
        offers: any[];
    }[]>;
    findOne(id: number): Promise<Wish>;
    findMany(userId: number): Promise<Wish[]>;
    update(id: number, updateWishDto: UpdateWishDto): string;
    remove(id: number): string;
    copyWish(wishId: number, userId: number): Promise<Wish>;
}
