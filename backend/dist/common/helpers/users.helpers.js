"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUsernameIfUnchanged = exports.hashPasswordIfProvided = exports.handleUniqueConstraintError = exports.detectQueryType = void 0;
const common_1 = require("@nestjs/common");
const auth_helpers_1 = require("./auth.helpers");
function detectQueryType(query) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(query) ? 'email' : 'username';
}
exports.detectQueryType = detectQueryType;
function handleUniqueConstraintError(err) {
    if (err.code == '23505') {
        throw new common_1.BadRequestException('This email or username is already in use by another user.');
    }
    throw err;
}
exports.handleUniqueConstraintError = handleUniqueConstraintError;
async function hashPasswordIfProvided(updateUserDto) {
    if (updateUserDto.password) {
        return await (0, auth_helpers_1.hashValue)(updateUserDto.password);
    }
    return undefined;
}
exports.hashPasswordIfProvided = hashPasswordIfProvided;
function removeUsernameIfUnchanged(updateUserDto, username) {
    if (updateUserDto.username === username) {
        delete updateUserDto.username;
    }
}
exports.removeUsernameIfUnchanged = removeUsernameIfUnchanged;
//# sourceMappingURL=users.helpers.js.map