import { Module } from '@nestjs/common';
import { HotelImagesController } from './hotel-images.controller';
import { HotelImagesService } from './hotel-images.service';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { HotelsModule } from '../hotels/hotels.module';

@Module({
  imports: [PrismaModule, HotelsModule],
  controllers: [HotelImagesController],
  providers: [HotelImagesService],
})
export class HotelImagesModule {}
