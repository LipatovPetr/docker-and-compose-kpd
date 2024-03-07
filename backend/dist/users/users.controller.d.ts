import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExtendedRequest } from 'src/common/types/common.types';
import { FindUserDto } from './dto/find-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOwn(req: ExtendedRequest): Promise<import("./entities/user.entity").User>;
    updateOwn(req: ExtendedRequest, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    getOwnWishes(req: ExtendedRequest): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findOne(username: string): Promise<import("./entities/user.entity").User>;
    findOneWishes(username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findMany(findUserDto: FindUserDto): Promise<import("./entities/user.entity").User[]>;
}
