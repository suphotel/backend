import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotel } from '@prisma/client';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  async findAll(): Promise<Hotel[]> {
    return await this.hotelsService.findMany();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Hotel> {
    return await this.hotelsService.findById(parseInt(params.id));
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() body: CreateHotelDto): Promise<Hotel> {
    return await this.hotelsService.create(body);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  async update(@Param() params, @Body() body: UpdateHotelDto): Promise<Hotel> {
    return await this.hotelsService.update(parseInt(params.id), body);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param() params): Promise<Hotel> {
    return await this.hotelsService.delete(parseInt(params.id));
  }
}
