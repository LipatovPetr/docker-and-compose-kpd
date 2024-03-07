import { User } from 'src/users/entities/user.entity';
declare const SigninAuthDto_base: import("@nestjs/common").Type<Pick<User, "username" | "password">>;
export declare class SigninAuthDto extends SigninAuthDto_base {
}
export {};
