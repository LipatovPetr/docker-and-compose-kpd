import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  itemsId: number[];
}
