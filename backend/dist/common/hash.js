"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = exports.hashValue = void 0;
const bcrypt = require("bcrypt");
async function hashValue(value) {
    return bcrypt.hash(value, 10);
}
exports.hashValue = hashValue;
async function verifyHash(value, hash) {
    const result = await bcrypt.compare(value, hash);
    return result;
}
exports.verifyHash = verifyHash;
//# sourceMappingURL=hash.js.map