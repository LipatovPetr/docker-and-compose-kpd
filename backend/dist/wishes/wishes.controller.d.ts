import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { ExtendedRequest } from 'src/common/types/common.types';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    findOwn(): Promise<import("./entities/wish.entity").Wish[]>;
    findLast(): Promise<import("./entities/wish.entity").Wish[]>;
    findTop(): Promise<import("./entities/wish.entity").Wish[]>;
    create(req: ExtendedRequest, createWishDto: CreateWishDto): Promise<import("./entities/wish.entity").Wish>;
    findOne(id: number): Promise<import("./entities/wish.entity").Wish>;
    update(req: ExtendedRequest, id: number, updateWishDto: UpdateWishDto): Promise<import("typeorm").UpdateResult>;
    remove(req: ExtendedRequest, id: number): Promise<import("./entities/wish.entity").Wish>;
    copyWish(req: ExtendedRequest, id: number): Promise<import("./entities/wish.entity").Wish>;
}
