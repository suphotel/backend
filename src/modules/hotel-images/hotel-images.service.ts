import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateHotelImageDto } from './dto/create-hotel-image.dto';
import { HotelsService } from '../hotels/hotels.service';
import { HotelImage } from '@prisma/client';
import * as fs from 'fs';

@Injectable()
export class HotelImagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hotelsService: HotelsService,
  ) {}

  async findById(id: number): Promise<HotelImage> {
    return this.prismaService.hotelImage.findUnique({
      where: { id },
    });
  }

  async create(hotelId: number, data: CreateHotelImageDto) {
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

  async delete(id: number) {
    const hotelImage = await this.findById(id);

    await fs.unlinkSync(hotelImage.path);

    return this.prismaService.hotelImage.delete({
      where: { id },
    });
  }
}
