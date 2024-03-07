import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Offer {
    user: User;
    item: Wish;
    amount: number;
    hidden: boolean;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
