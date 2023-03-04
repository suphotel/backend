import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { HotelImage } from '@prisma/client';
import { PrismaService } from '../../../providers/prisma';
import { HotelsService } from '../../hotels';
import { CreateHotelImageDto } from '../dto/create-hotel-image.dto';

@Injectable()
export class HotelImagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hotelsService: HotelsService,
  ) {}

  async findMany(hotelId: number): Promise<HotelImage[]> {
    const hotel = this.hotelsService.findById(hotelId);

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return this.prismaService.hotelImage.findMany({
      where: {
        hotelId,
      },
    });
  }

  async findById(id: number): Promise<HotelImage> {
    const hotelImage = this.prismaService.hotelImage.findUnique({
      where: { id },
    });

    if (!hotelImage) {
      throw new NotFoundException('Hotel image not found');
    }

    return hotelImage;
  }

  async create(
    hotelId: number,
    data: CreateHotelImageDto,
  ): Promise<HotelImage> {
    const hotel = this.hotelsService.findById(hotelId);

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return this.prismaService.hotelImage.create({
      data: {
        ...data,
        hotelId: hotelId,
      },
    });
  }

  async delete(id: number): Promise<HotelImage> {
    const hotelImage = await this.prismaService.hotelImage.findUnique({
      where: { id },
    });

    if (!hotelImage) {
      throw new NotFoundException('Hotel image not found');
    }

    await fs.unlinkSync(hotelImage.path);

    return this.prismaService.hotelImage.delete({
      where: { id },
    });
  }
}
