import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma';
import { Booking } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { RelationException } from '../../common';

@Injectable()
export class BookingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(hotelId: number): Promise<Booking[]> {
    return this.prismaService.booking.findMany({
      where: {
        hotelId,
      },
    });
  }

  async findById(hotelId: number, bookingId: number): Promise<Booking> {
    await this.checkIfHotelExists(hotelId);

    const booking = await this.prismaService.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.hotelId !== hotelId) {
      throw new RelationException('Booking does not belong to this hotel');
    }

    return booking;
  }

  async create(
    hotelId: number,
    userId: number,
    data: CreateBookingDto,
  ): Promise<Booking> {
    await this.checkIfHotelExists(hotelId);

    return this.prismaService.booking.create({
      data: {
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        userId,
        hotelId,
      },
    });
  }

  async update(
    hotelId: number,
    userId: number,
    bookingId: number,
    data: UpdateBookingDto,
  ): Promise<Booking> {
    await this.checkIfHotelExists(hotelId);

    const booking = await this.prismaService.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.hotelId !== hotelId) {
      throw new RelationException('Booking does not belong to this hotel');
    }

    if (booking.userId !== userId) {
      throw new RelationException('Booking does not belong to this user');
    }

    return this.prismaService.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate && { endDate: new Date(data.endDate) }),
      },
    });
  }

  async delete(
    hotelId: number,
    userId: number,
    bookingId: number,
  ): Promise<Booking> {
    await this.checkIfHotelExists(hotelId);

    const booking = await this.prismaService.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.hotelId !== hotelId) {
      throw new RelationException('Booking does not belong to this hotel');
    }

    if (booking.userId !== userId) {
      throw new RelationException('Booking does not belong to this user');
    }

    return this.prismaService.booking.delete({
      where: {
        id: booking.id,
      },
    });
  }

  private async checkIfHotelExists(hotelId: number): Promise<void> {
    const hotel = await this.prismaService.hotel.count({
      where: {
        id: hotelId,
      },
    });

    if (hotel === 0) {
      throw new NotFoundException('Hotel not found');
    }
  }
}
