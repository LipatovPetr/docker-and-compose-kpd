import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ExtendedRequest } from 'src/common/types/common.types';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    create(req: ExtendedRequest, createWishlistDto: CreateWishlistDto): Promise<import("./entities/wishlist.entity").Wishlist>;
    findAll(): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    findOne(id: number): Promise<import("./entities/wishlist.entity").Wishlist>;
    update(req: ExtendedRequest, updateWishlistDto: UpdateWishlistDto, id: number): Promise<import("./entities/wishlist.entity").Wishlist>;
    remove(req: ExtendedRequest, id: number): Promise<import("./entities/wishlist.entity").Wishlist>;
}
