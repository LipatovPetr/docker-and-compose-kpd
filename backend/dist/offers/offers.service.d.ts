import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
export declare class OffersService {
    private offerRepository;
    private readonly usersService;
    private readonly wishesService;
    constructor(offerRepository: Repository<Offer>, usersService: UsersService, wishesService: WishesService);
    create(userId: number, createOfferDto: CreateOfferDto): Promise<Offer>;
    findAll(): Promise<Offer[]>;
    findOne(id: number): Promise<Offer>;
}
