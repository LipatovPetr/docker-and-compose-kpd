import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Length, IsUrl } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Wishlist {
  @Column({
    type: 'varchar',
  })
  @Length(1, 250, { message: 'Name must be between 1 and 250 characters' })
  name: string;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.wishlists, { eager: true })
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists, { eager: true })
  @JoinTable()
  owner: User;

  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
