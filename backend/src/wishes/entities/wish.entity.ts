import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Length, IsUrl } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { ColumnNumericTransformer } from 'src/common/transformers/numeric.transformer';
@Entity()
export class Wish {
  @Column({
    type: 'varchar',
  })
  @Length(1, 250, { message: 'Name must be between 1 and 250 characters' })
  name: string;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  link: string;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  image: string;

  @Column({
    type: 'decimal',
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({
    type: 'decimal',
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  raised: number;

  @Column({ type: 'integer', default: 0 })
  copied: number;

  @Column({
    type: 'varchar',
  })
  @Length(1, 1024, { message: 'Name must be between 1 and 1024 characters' })
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items, {
    cascade: true,
  })
  @JoinTable()
  wishlists: Wishlist[];

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
