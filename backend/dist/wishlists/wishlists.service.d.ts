import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
export declare class WishlistsService {
    private wishlistRepository;
    private readonly usersService;
    private readonly wishesService;
    constructor(wishlistRepository: Repository<Wishlist>, usersService: UsersService, wishesService: WishesService);
    create(id: any, createWishlistDto: CreateWishlistDto): Promise<Wishlist>;
    findAll(): Promise<Wishlist[]>;
    findOne(id: number): Promise<Wishlist>;
    update(id: number, userId: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist>;
    remove(id: number, userId: number): Promise<Wishlist>;
}
