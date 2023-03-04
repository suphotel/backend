import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, RoleGuard, Roles } from '../../auth';
import { StatsService } from '../service/stats.service';

export interface StatsResponse {
  usersCount: number;
  hotelsCount: number;
  bookingsCount: number;
}

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get stats' })
  @ApiBearerAuth()
  async index(): Promise<StatsResponse> {
    const usersCount = await this.statsService.getUsersCount();
    const hotelsCount = await this.statsService.getHotelsCount();
    const bookingsCount = await this.statsService.getBookingsCount();

    return {
      usersCount,
      hotelsCount,
      bookingsCount,
    };
  }
}
