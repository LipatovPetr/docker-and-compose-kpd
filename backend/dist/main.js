"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const configuration_1 = require("./config/configuration");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = await (0, configuration_1.default)();
    const port = config.port;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map