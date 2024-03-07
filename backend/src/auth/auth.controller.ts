import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
import { SigninUserResponseDto } from './dto/signin-response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<SigninUserResponseDto> {
    return this.authService.login(req.user as UserProfileResponseDto);
  }

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupResponseDto> {
    return this.authService.signUp(createUserDto);
  }
}
