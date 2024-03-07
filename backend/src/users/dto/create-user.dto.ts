import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsUrl,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(2)
  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(0, 200)
  @IsOptional()
  about: string;

  @IsUrl()
  @IsOptional()
  avatar: string;
}
