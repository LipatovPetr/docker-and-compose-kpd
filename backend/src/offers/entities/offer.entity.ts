import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Offer {
  @ManyToOne(() => User, (user) => user.offers, { eager: true })
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers, { eager: true })
  item: Wish;

  @Column({ type: 'decimal', scale: 2 })
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
