import { BadRequestException } from '@nestjs/common';

export function isWishValidForOffer(userId: number, wishOwnerId: number) {
  if (userId == wishOwnerId) {
    throw new BadRequestException(
      `You cannot create offers for your own wishes.`,
    );
  }
  return true;
}

export function isOfferAmountValid(
  offerAmount: number,
  WishPrice: number,
  WishRaised: number,
) {
  if (offerAmount > WishPrice - WishRaised) {
    throw new BadRequestException(
      `The offered amount exceeds the required contribution for this wish by ${
        offerAmount - (WishPrice - WishRaised)
      }. Please provide a valid contribution.`,
    );
  }
  return true;
}
