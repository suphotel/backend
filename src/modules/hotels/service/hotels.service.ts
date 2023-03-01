import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../providers/prisma';
import { Hotel } from '@prisma/client';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { UpdateHotelDto } from '../dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<Hotel[]> {
    return this.prismaService.hotel.findMany({
      include: {
        images: true,
        bookings: true,
      },
    });
  }

  async findById(id: number): Promise<Hotel> {
    const hotel = await this.prismaService.hotel.findUnique({
      where: { id },
      include: {
        images: true,
        bookings: true,
      },
    });

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return hotel;
  }

  async create(data: CreateHotelDto): Promise<Hotel> {
    return this.prismaService.hotel.create({
      data: {
        ...data,
      },
    });
  }

  async update(id: number, data: UpdateHotelDto): Promise<Hotel> {
    const hotel = await this.prismaService.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return this.prismaService.hotel.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: number): Promise<Hotel> {
    const hotel = await this.prismaService.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return this.prismaService.hotel.delete({
      where: { id },
    });
  }
}
