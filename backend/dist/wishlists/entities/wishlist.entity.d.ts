import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Wishlist {
    name: string;
    image: string;
    items: Wish[];
    owner: User;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
