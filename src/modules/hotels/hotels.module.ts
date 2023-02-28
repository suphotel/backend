import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { PrismaModule } from '../../providers/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HotelsService],
  controllers: [HotelsController],
})
export class HotelsModule {}
