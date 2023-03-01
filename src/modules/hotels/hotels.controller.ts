import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotel } from '@prisma/client';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Roles, RoleGuard, JwtAuthGuard } from '../auth';
import { ModelNotFound, ModelNotFoundInterceptor } from '../../common';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  async findAll(): Promise<Hotel[]> {
    return await this.hotelsService.findMany();
  }

  @Get(':id')
  @ModelNotFound([{ model: 'Hotel', field: 'id' }])
  @UseInterceptors(ModelNotFoundInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Hotel> {
    return await this.hotelsService.findById(id);
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(@Body() body: CreateHotelDto): Promise<Hotel> {
    return await this.hotelsService.create(body);
  }

  @Put(':id')
  @ModelNotFound([{ model: 'Hotel', field: 'id' }])
  @UseInterceptors(ModelNotFoundInterceptor)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHotelDto,
  ): Promise<Hotel> {
    return await this.hotelsService.update(id, body);
  }
  @Delete(':id')
  @ModelNotFound([{ model: 'Hotel', field: 'id' }])
  @UseInterceptors(ModelNotFoundInterceptor)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Hotel> {
    return await this.hotelsService.delete(id);
  }
}
