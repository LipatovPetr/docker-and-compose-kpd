"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUpdateDtoToQueryObject = void 0;
const typeorm_1 = require("typeorm");
async function mapUpdateDtoToQueryObject(wishesService, updateWishlistDto, queryObject) {
    if (updateWishlistDto.name) {
        queryObject.name = updateWishlistDto.name;
    }
    if (updateWishlistDto.image) {
        queryObject.image = updateWishlistDto.image;
    }
    if ('itemsId' in updateWishlistDto) {
        const wishes = await wishesService.findMany({
            id: (0, typeorm_1.In)(updateWishlistDto.itemsId),
        });
        queryObject.items = wishes;
    }
}
exports.mapUpdateDtoToQueryObject = mapUpdateDtoToQueryObject;
//# sourceMappingURL=wishlists.helpers.js.map