import { UpdateUserDto } from 'src/users/dto/update-user.dto';
export declare function detectQueryType(query: string): 'email' | 'username';
export declare function handleUniqueConstraintError(err: any): void;
export declare function hashPasswordIfProvided(updateUserDto: UpdateUserDto): Promise<string | undefined>;
export declare function removeUsernameIfUnchanged(updateUserDto: UpdateUserDto, username: string): void;
