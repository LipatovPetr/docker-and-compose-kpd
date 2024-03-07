"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../users/entities/user.entity");
class SigninAuthDto extends (0, swagger_1.PickType)(user_entity_1.User, [
    'username',
    'password',
]) {
}
exports.SigninAuthDto = SigninAuthDto;
//# sourceMappingURL=signin-auth.dto.js.map