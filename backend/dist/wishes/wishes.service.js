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
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wish_entity_1 = require("./entities/wish.entity");
const users_service_1 = require("../users/users.service");
const wishes_helpers_1 = require("../common/helpers/wishes.helpers");
let WishesService = class WishesService {
    constructor(wishRepository, usersService) {
        this.wishRepository = wishRepository;
        this.usersService = usersService;
    }
    async create(userId, createWishDto) {
        const owner = await this.usersService.findOwn(userId);
        const newWish = await this.wishRepository.create(Object.assign(Object.assign({}, createWishDto), { owner }));
        return this.wishRepository.save(newWish);
    }
    async findLast() {
        const lastWishes = await this.wishRepository.find({
            order: { createdAt: 'DESC' },
            take: 12,
        });
        return lastWishes;
    }
    async findTop() {
        const topWishes = await this.wishRepository.find({
            order: { copied: 'DESC' },
            take: 12,
        });
        return topWishes;
    }
    async findOne(id) {
        const wish = await this.wishRepository.findOne({
            where: { id },
            relations: ['owner', 'offers'],
        });
        if (!wish) {
            throw new common_1.BadRequestException(`No wish found with id #${id}. Please provide a valid wish id.`);
        }
        return wish;
    }
    async findMany(query) {
        const wishes = await this.wishRepository.findBy(query);
        return wishes;
    }
    async update(userId, wishId, updateWishDto) {
        const wish = await this.findOne(wishId);
        (0, wishes_helpers_1.isUserWishOwner)(wish.owner.id, userId);
        (0, wishes_helpers_1.isWishEligibleToBeChanged)(wish, updateWishDto);
        return this.wishRepository.update(wishId, updateWishDto);
    }
    async remove(userId, wishId) {
        const removedWish = await this.findOne(wishId);
        if (removedWish.owner.id !== userId) {
            throw new common_1.BadRequestException(`Cannot remove a wish that does not belong to the user with ID ${userId}`);
        }
        this.wishRepository.delete(wishId);
        return removedWish;
    }
    async copyWish(wishId, userId) {
        const user = await this.usersService.findOwn(userId);
        const wishToCopy = await this.findOne(wishId);
        if (wishToCopy) {
            await this.update(wishToCopy.owner.id, wishToCopy.id, {
                copied: wishToCopy.copied + 1,
            });
        }
        const newWish = await this.wishRepository.create({
            name: wishToCopy.name,
            link: wishToCopy.link,
            image: wishToCopy.image,
            price: wishToCopy.price,
            description: wishToCopy.description,
            owner: user,
        });
        return this.wishRepository.save(newWish);
    }
};
WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], WishesService);
exports.WishesService = WishesService;
//# sourceMappingURL=wishes.service.js.map