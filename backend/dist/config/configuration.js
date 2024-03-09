"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT) || 3001,
    secret: process.env.SECRET,
    db_host: process.env.POSTGRES_HOST,
    db_port: parseInt(process.env.POSTGRES_PORT),
    db_name: process.env.POSTGRES_DB,
    db_user: process.env.POSTGRES_USER,
    db_password: process.env.POSTGRES_PASSWORD,
});
//# sourceMappingURL=configuration.js.map