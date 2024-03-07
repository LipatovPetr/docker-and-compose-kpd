import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';

export class SignupResponseDto extends PickType(User, [
  'id',
  'username',
  'about',
  'avatar',
  'email',
  'createdAt',
  'updatedAt',
] as const) {}
