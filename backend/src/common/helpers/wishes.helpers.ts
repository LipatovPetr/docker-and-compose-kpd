import { BadRequestException } from '@nestjs/common';
import { UpdateWishDto } from 'src/wishes/dto/update-wish.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

export function isUserWishOwner(ownerId, userId) {
  if (ownerId !== userId) {
    throw new BadRequestException(
      `You are not authorized to update wishes that belong to other users.`,
    );
  }
  return true;
}

export function isWishEligibleToBeChanged(
  wish: Wish,
  updateWishDto: UpdateWishDto,
) {
  if (
    wish.raised > 0 &&
    Object.keys(updateWishDto).some(
      (field) => field !== 'raised' && field !== 'copied',
    )
  ) {
    throw new BadRequestException(
      `A wish cannot be changed if somebody had already funded it`,
    );
  }
  return true;
}
