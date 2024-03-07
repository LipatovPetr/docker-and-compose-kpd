import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        username: string;
        about: string;
        avatar: string;
        email: string;
        wishes: import("../wishes/entities/wish.entity").Wish[];
        offers: import("../offers/entities/offer.entity").Offer[];
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: UserProfileResponseDto): Promise<{
        access_token: string;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<SignupResponseDto>;
}
