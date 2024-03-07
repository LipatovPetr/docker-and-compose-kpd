"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWishEligibleToBeChanged = exports.isUserWishOwner = void 0;
const common_1 = require("@nestjs/common");
function isUserWishOwner(ownerId, userId) {
    if (ownerId !== userId) {
        throw new common_1.BadRequestException(`You are not authorized to update wishes that belong to other users.`);
    }
    return true;
}
exports.isUserWishOwner = isUserWishOwner;
function isWishEligibleToBeChanged(wish, updateWishDto) {
    if (wish.raised > 0 &&
        Object.keys(updateWishDto).some((field) => field !== 'raised' && field !== 'copied')) {
        throw new common_1.BadRequestException(`A wish cannot be changed if somebody had already funded it`);
    }
    return true;
}
exports.isWishEligibleToBeChanged = isWishEligibleToBeChanged;
//# sourceMappingURL=wishes.helpers.js.map