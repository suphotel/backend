import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ModelNotFoundInterceptor, ModelNotFound } from '../../common';

@Controller('hotels/:hotelId/bookings')
@UseInterceptors(ModelNotFoundInterceptor)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ModelNotFound([{ model: 'Hotel', field: 'hotelId' }])
  @UseInterceptors(ModelNotFoundInterceptor)
  async findAll(
    @Param('hotelId', ParseIntPipe) id: number,
  ): Promise<Booking[]> {
    return this.bookingsService.findMany(id);
  }

  @Get(':id')
  @ModelNotFound([
    { model: 'Hotel', field: 'hotelId' },
    { model: 'Booking', field: 'id' },
  ])
  @UseInterceptors(ModelNotFoundInterceptor)
  async findOne(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Booking> {
    return this.bookingsService.findById(hotelId, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ModelNotFound([{ model: 'Hotel', field: 'hotelId' }])
  @UseInterceptors(ModelNotFoundInterceptor)
  async create(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Body() body: CreateBookingDto,
    @Req() req,
  ): Promise<Booking> {
    return this.bookingsService.create(hotelId, req.user.id, body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ModelNotFound([
    { model: 'Hotel', field: 'hotelId' },
    { model: 'Booking', field: 'id' },
  ])
  @UseInterceptors(ModelNotFoundInterceptor)
  async update(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBookingDto,
    @Req() req,
  ): Promise<Booking> {
    return this.bookingsService.update(hotelId, req.user.id, id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ModelNotFound([
    { model: 'Hotel', field: 'hotelId' },
    { model: 'Booking', field: 'id' },
  ])
  @UseInterceptors(ModelNotFoundInterceptor)
  async delete(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<Booking> {
    return this.bookingsService.delete(hotelId, req.user.id, id);
  }
}
