import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateOfferDto {
  @Min(1)
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  itemId: number;

  @IsOptional()
  hidden: false;
}
