import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Hotel } from '@prisma/client';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<Hotel[]> {
    return this.prismaService.hotel.findMany();
  }

  async findById(id: number): Promise<Hotel> {
    return this.prismaService.hotel.findUnique({
      where: { id },
    });
  }

  async create(data: CreateHotelDto): Promise<Hotel> {
    return this.prismaService.hotel.create({
      data: {
        ...data,
      },
    });
  }

  async update(id: number, data: UpdateHotelDto): Promise<Hotel> {
    return this.prismaService.hotel.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: number): Promise<Hotel> {
    return this.prismaService.hotel.delete({
      where: { id },
    });
  }
}
