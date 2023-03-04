import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../providers/prisma';

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHotelsCount(): Promise<number> {
    return this.prismaService.hotel.count();
  }

  async getBookingsCount(): Promise<number> {
    return this.prismaService.booking.count();
  }

  async getUsersCount(): Promise<number> {
    return this.prismaService.user.count();
  }
}
