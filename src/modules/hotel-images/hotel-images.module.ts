import { Module } from '@nestjs/common';
import { HotelImagesController } from './controller/hotel-images.controller';
import { HotelImagesService } from './service/hotel-images.service';
import { PrismaModule } from '../../providers/prisma';
import { HotelsModule } from '../hotels';

@Module({
  imports: [PrismaModule, HotelsModule],
  controllers: [HotelImagesController],
  providers: [HotelImagesService],
})
export class HotelImagesModule {}
