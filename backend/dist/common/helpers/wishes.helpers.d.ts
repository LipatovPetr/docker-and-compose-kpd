import { UpdateWishDto } from 'src/wishes/dto/update-wish.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare function isUserWishOwner(ownerId: any, userId: any): boolean;
export declare function isWishEligibleToBeChanged(wish: Wish, updateWishDto: UpdateWishDto): boolean;
