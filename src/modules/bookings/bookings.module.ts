import { Module } from '@nestjs/common';
import { BookingsController } from './controller/bookings.controller';
import { BookingsService } from './service/bookings.service';
import { PrismaModule } from '../../providers/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
