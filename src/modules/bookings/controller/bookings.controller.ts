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
import { BookingsService } from '../service/bookings.service';
import { Booking } from '@prisma/client';
import {
  CreateBookingDto,
  createBookingSchema,
} from '../dto/create-booking.dto';
import { JwtAuthGuard } from '../../auth';
import {
  UpdateBookingDto,
  updateBookingSchema,
} from '../dto/update-booking.dto';
import { ModelNotFoundInterceptor, ModelNotFound } from '../../../common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';

@Controller('hotels/:hotelId/bookings')
@ApiTags('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ModelNotFound([{ model: 'Hotel', field: 'hotelId' }])
  @UseInterceptors(ModelNotFoundInterceptor)
  @ApiOperation({ summary: 'Get all bookings for a hotel' })
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
  @ApiOperation({ summary: 'Get a booking by id' })
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
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBearerAuth()
  async create(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Body(new JoiValidationPipe(createBookingSchema)) body: CreateBookingDto,
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
  @ApiOperation({ summary: 'Update a booking' })
  @ApiBearerAuth()
  async update(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(updateBookingSchema)) body: UpdateBookingDto,
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
  @ApiOperation({ summary: 'Delete a booking' })
  @ApiBearerAuth()
  async delete(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<Booking> {
    return this.bookingsService.delete(hotelId, req.user.id, id);
  }
}
