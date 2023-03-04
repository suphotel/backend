import { Module } from '@nestjs/common';
import { StatsController } from './controller/stats.controller';
import { StatsService } from './service/stats.service';
import { PrismaModule } from '../../providers/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
