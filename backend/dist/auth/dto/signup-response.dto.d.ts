import { User } from 'src/users/entities/user.entity';
declare const SignupResponseDto_base: import("@nestjs/mapped-types").MappedType<Pick<User, "id" | "createdAt" | "updatedAt" | "username" | "about" | "avatar" | "email">>;
export declare class SignupResponseDto extends SignupResponseDto_base {
}
export {};
