import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function hashValue(value: string) {
  return bcrypt.hash(value, 10);
}

export async function verifyHash(value: string, hash: string) {
  const isPasswordVerified = await bcrypt.compare(value, hash);

  if (!isPasswordVerified) {
    throw new UnauthorizedException();
  }

  return isPasswordVerified;
}
