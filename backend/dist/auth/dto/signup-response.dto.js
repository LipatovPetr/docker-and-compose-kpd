"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupResponseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const user_entity_1 = require("../../users/entities/user.entity");
class SignupResponseDto extends (0, mapped_types_1.PickType)(user_entity_1.User, [
    'id',
    'username',
    'about',
    'avatar',
    'email',
    'createdAt',
    'updatedAt',
]) {
}
exports.SignupResponseDto = SignupResponseDto;
//# sourceMappingURL=signup-response.dto.js.map