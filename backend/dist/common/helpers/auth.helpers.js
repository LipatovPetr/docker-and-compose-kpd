"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = exports.hashValue = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
async function hashValue(value) {
    return bcrypt.hash(value, 10);
}
exports.hashValue = hashValue;
async function verifyHash(value, hash) {
    const isPasswordVerified = await bcrypt.compare(value, hash);
    if (!isPasswordVerified) {
        throw new common_1.UnauthorizedException();
    }
    return isPasswordVerified;
}
exports.verifyHash = verifyHash;
//# sourceMappingURL=auth.helpers.js.map