import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
export declare class Wish {
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    copied: number;
    description: string;
    owner: User;
    wishlists: Wishlist[];
    offers: Offer[];
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
