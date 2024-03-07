import { User } from '../entities/user.entity';
declare const UserProfileResponseDto_base: import("@nestjs/mapped-types").MappedType<Pick<User, "id" | "createdAt" | "updatedAt" | "username" | "about" | "avatar" | "email">>;
export declare class UserProfileResponseDto extends UserProfileResponseDto_base {
}
export {};
