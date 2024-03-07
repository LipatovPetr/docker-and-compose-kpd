import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { SigninUserResponseDto } from './dto/signin-response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<SigninUserResponseDto>;
    signUp(createUserDto: CreateUserDto): Promise<SignupResponseDto>;
}
