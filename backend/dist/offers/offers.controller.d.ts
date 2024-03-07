import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ExtendedRequest } from 'src/common/types/common.types';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    create(req: ExtendedRequest, createOfferDto: CreateOfferDto): Promise<import("./entities/offer.entity").Offer>;
    findAll(): Promise<import("./entities/offer.entity").Offer[]>;
    findOne(id: number): Promise<import("./entities/offer.entity").Offer>;
}
