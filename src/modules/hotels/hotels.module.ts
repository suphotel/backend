import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { PrismaModule } from '../../providers/prisma';

@Module({
  imports: [PrismaModule],
  providers: [HotelsService],
  controllers: [HotelsController],
  exports: [HotelsService],
})
export class HotelsModule {}
