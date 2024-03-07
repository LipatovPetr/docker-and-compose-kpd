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
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
const wishes_service_1 = require("../wishes/wishes.service");
const wishlists_helpers_1 = require("../common/helpers/wishlists.helpers");
let WishlistsService = class WishlistsService {
    constructor(wishlistRepository, usersService, wishesService) {
        this.wishlistRepository = wishlistRepository;
        this.usersService = usersService;
        this.wishesService = wishesService;
    }
    async create(id, createWishlistDto) {
        const user = await this.usersService.findOwn(id);
        const wishes = await this.wishesService.findMany({
            id: (0, typeorm_1.In)(createWishlistDto.itemsId),
        });
        const newWishlist = await this.wishlistRepository.create(Object.assign(Object.assign({}, createWishlistDto), { owner: user, items: wishes }));
        return this.wishlistRepository.save(newWishlist);
    }
    findAll() {
        return this.wishlistRepository.find();
    }
    async findOne(id) {
        const wishlist = await this.wishlistRepository.findOneBy({ id });
        if (!wishlist) {
            throw new common_1.BadRequestException(`Wishlist with id ${id} not found`);
        }
        return wishlist;
    }
    async update(id, userId, updateWishlistDto) {
        const updateQueryObject = {};
        const wishlist = await this.findOne(id);
        if (wishlist.owner.id !== userId) {
            throw new common_1.ForbiddenException("You cannot edit other people's wishlists.");
        }
        await (0, wishlists_helpers_1.mapUpdateDtoToQueryObject)(this.wishesService, updateWishlistDto, updateQueryObject);
        await this.wishlistRepository.save(Object.assign({ id }, updateQueryObject));
        const updatedWishlist = await this.findOne(id);
        return updatedWishlist;
    }
    async remove(id, userId) {
        const wishlistToRemove = await this.findOne(id);
        if (!wishlistToRemove) {
            throw new common_1.BadRequestException(`Wishlist with id ${id} not found`);
        }
        if (wishlistToRemove.owner.id !== userId) {
            throw new common_1.ForbiddenException("You cannot delete other people's wishlists");
        }
        return this.wishlistRepository.remove(wishlistToRemove);
    }
};
WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(wishlist_entity_1.Wishlist)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => wishes_service_1.WishesService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        wishes_service_1.WishesService])
], WishlistsService);
exports.WishlistsService = WishlistsService;
//# sourceMappingURL=wishlists.service.js.map