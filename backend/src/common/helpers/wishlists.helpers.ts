import { WishesService } from 'src/wishes/wishes.service';
import { UpdateWishlistDto } from 'src/wishlists/dto/update-wishlist.dto';
import { In } from 'typeorm';

export async function mapUpdateDtoToQueryObject(
  wishesService: WishesService,
  updateWishlistDto: UpdateWishlistDto,
  queryObject,
) {
  if (updateWishlistDto.name) {
    queryObject.name = updateWishlistDto.name;
  }

  if (updateWishlistDto.image) {
    queryObject.image = updateWishlistDto.image;
  }

  if ('itemsId' in updateWishlistDto) {
    const wishes = await wishesService.findMany({
      id: In(updateWishlistDto.itemsId),
    });
    queryObject.items = wishes;
  }
}
