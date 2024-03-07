import { Module, forwardRef } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { Wishlist } from './entities/wishlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { WishesModule } from 'src/wishes/wishes.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => WishesModule),
    TypeOrmModule.forFeature([Wishlist]),
  ],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
