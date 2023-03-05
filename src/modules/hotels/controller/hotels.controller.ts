import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelsService } from '../service/hotels.service';
import { Hotel, Prisma } from '@prisma/client';
import { CreateHotelDto, createHotelSchema } from '../dto/create-hotel.dto';
import { UpdateHotelDto, updateHotelSchema } from '../dto/update-hotel.dto';
import { Roles, RoleGuard, JwtAuthGuard } from '../../../common';
import { ModelNotFound, ModelNotFoundInterceptor } from '../../../common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';

export type HotelQuery = {
  name?: Prisma.SortOrder;
  location?: Prisma.SortOrder;
  createdAt?: Prisma.SortOrder;

  skip?: string;
  take?: string;
};

@Controller('hotels')
@ApiTags('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  async findAll(@Query() query: HotelQuery): Promise<Hotel[]> {
    const { skip, take, ...sorting } = query;

    return await this.hotelsService.findMany({
      orderBy: {
        ...(sorting as Prisma.HotelOrderByWithAggregationInput),
      },
      ...(skip && { skip: parseInt(skip) }),
      ...(take && { take: parseInt(take) }),
    });
  }

  @Get(':id')
  @ModelNotFound([{ model: 'Hotel', field: 'id' }])
  @UseInterceptors(ModelNotFoundInterceptor)
  @ApiOperation({ summary: 'Get a hotel by id' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Hotel> {
    return await this.hotelsService.findById(id);
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Protected by admin role' })
  async create(
    @Body(new JoiValidationPipe(createHotelSchema)) body: CreateHotelDto,
  ): Promise<Hotel> {
    return await this.hotelsService.create(body);
  }

  @Put(':id')
  @ModelNotFound([{ model: 'Hotel', field: 'id' }])
  @UseInterceptors(ModelNotFoundInterceptor)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Update a hotel' })
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Protected by admin role' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(updateHotelSchema)) body: UpdateHotelDto,
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
