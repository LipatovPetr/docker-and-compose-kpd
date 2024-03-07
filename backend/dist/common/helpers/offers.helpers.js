"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOfferAmountValid = exports.isWishValidForOffer = void 0;
const common_1 = require("@nestjs/common");
function isWishValidForOffer(userId, wishOwnerId) {
    if (userId == wishOwnerId) {
        throw new common_1.BadRequestException(`You cannot create offers for your own wishes.`);
    }
    return true;
}
exports.isWishValidForOffer = isWishValidForOffer;
function isOfferAmountValid(offerAmount, WishPrice, WishRaised) {
    if (offerAmount > WishPrice - WishRaised) {
        throw new common_1.BadRequestException(`The offered amount exceeds the required contribution for this wish by ${offerAmount - (WishPrice - WishRaised)}. Please provide a valid contribution.`);
    }
    return true;
}
exports.isOfferAmountValid = isOfferAmountValid;
//# sourceMappingURL=offers.helpers.js.map