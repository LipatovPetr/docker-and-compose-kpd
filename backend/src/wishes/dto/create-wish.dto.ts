import { IsString, IsNotEmpty, IsUrl, Length, Min } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
