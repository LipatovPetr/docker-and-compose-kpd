"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const wishes_service_1 = require("../wishes/wishes.service");
const offers_helpers_1 = require("../common/helpers/offers.helpers");
let OffersService = class OffersService {
    constructor(offerRepository, usersService, wishesService) {
        this.offerRepository = offerRepository;
        this.usersService = usersService;
        this.wishesService = wishesService;
    }
    async create(userId, createOfferDto) {
        const user = await this.usersService.findOwn(userId);
        const wish = await this.wishesService.findOne(createOfferDto.itemId);
        (0, offers_helpers_1.isWishValidForOffer)(userId, wish.owner.id);
        (0, offers_helpers_1.isOfferAmountValid)(createOfferDto.amount, wish.price, wish.raised);
        const newOffer = this.offerRepository.create(Object.assign(Object.assign({}, createOfferDto), { item: wish, user }));
        const updatedWish = await this.wishesService.update(wish.owner.id, wish.id, {
            raised: wish.raised + createOfferDto.amount,
        });
        return this.offerRepository.save(newOffer);
    }
    async findAll() {
        return this.offerRepository.find();
    }
    findOne(id) {
        return this.offerRepository.findOneOrFail({ where: { id } });
    }
};
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        wishes_service_1.WishesService])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map