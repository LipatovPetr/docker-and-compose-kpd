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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const auth_helpers_1 = require("../common/helpers/auth.helpers");
const wishes_service_1 = require("../wishes/wishes.service");
const users_helpers_1 = require("../common/helpers/users.helpers");
let UsersService = class UsersService {
    constructor(userRepository, wishesService) {
        this.userRepository = userRepository;
        this.wishesService = wishesService;
    }
    async create(createUserDto) {
        try {
            const { password } = createUserDto;
            const hashedPassword = await (0, auth_helpers_1.hashValue)(password);
            const newUser = this.userRepository.create(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
            if (!newUser.about) {
                delete newUser.about;
            }
            return await this.userRepository.save(newUser);
        }
        catch (err) {
            (0, users_helpers_1.handleUniqueConstraintError)(err);
        }
    }
    async findOne(username) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .addSelect(['user.password'])
            .getOne();
        if (!user) {
            throw new common_1.BadRequestException(`User with username '${username}' does not exist.`);
        }
        return user;
    }
    async findOwn(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.BadRequestException(`User id #'${id}' does not exist.`);
        }
        return user;
    }
    async updateOwn(id, updateUserDto) {
        try {
            const user = await this.findOwn(id);
            (0, users_helpers_1.removeUsernameIfUnchanged)(updateUserDto, user.username);
            await (0, users_helpers_1.hashPasswordIfProvided)(updateUserDto);
            await this.userRepository.update(id, updateUserDto);
            const updatedUser = await this.findOwn(id);
            return updatedUser;
        }
        catch (err) {
            (0, users_helpers_1.handleUniqueConstraintError)(err);
        }
    }
    getOwnWishes(id) {
        return this.wishesService.findMany({ owner: { id } });
    }
    async findOneWishes(username) {
        const user = await this.findOne(username);
        const usersWishes = await this.wishesService.findMany({
            owner: { id: user.id },
        });
        return usersWishes;
    }
    async findMany(findUserDto) {
        const queryType = (0, users_helpers_1.detectQueryType)(findUserDto.query);
        const users = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.email')
            .where(queryType === 'email'
            ? { email: findUserDto.query }
            : { username: findUserDto.query })
            .getMany();
        return users;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => wishes_service_1.WishesService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        wishes_service_1.WishesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map