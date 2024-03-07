"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileResponseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const user_entity_1 = require("../entities/user.entity");
class UserProfileResponseDto extends (0, mapped_types_1.PickType)(user_entity_1.User, [
    'id',
    'username',
    'about',
    'avatar',
    'email',
    'createdAt',
    'updatedAt',
]) {
}
exports.UserProfileResponseDto = UserProfileResponseDto;
//# sourceMappingURL=user-profile-response.dto.js.map