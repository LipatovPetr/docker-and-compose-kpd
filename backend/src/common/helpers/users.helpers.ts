import { BadRequestException } from '@nestjs/common';
import { hashValue } from './auth.helpers';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

export function detectQueryType(query: string): 'email' | 'username' {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return emailRegex.test(query) ? 'email' : 'username';
}

export function handleUniqueConstraintError(err) {
  if (err.code == '23505') {
    throw new BadRequestException(
      'This email or username is already in use by another user.',
    );
  }
  throw err;
}

export async function hashPasswordIfProvided(
  updateUserDto: UpdateUserDto,
): Promise<string | undefined> {
  if (updateUserDto.password) {
    return await hashValue(updateUserDto.password);
  }
  return undefined;
}

export function removeUsernameIfUnchanged(
  updateUserDto: UpdateUserDto,
  username: string,
): void {
  if (updateUserDto.username === username) {
    delete updateUserDto.username;
  }
}
