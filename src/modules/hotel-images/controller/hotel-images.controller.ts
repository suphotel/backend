import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { HotelImagesService } from '../service/hotel-images.service';
import { join } from 'path';
import { RoleGuard, JwtAuthGuard, Roles } from '../../auth';
import { ModelNotFoundInterceptor, ModelNotFound } from '../../../common';
import { HotelImage } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('hotels/:hotelId/images')
@ApiTags('hotel-images')
export class HotelImagesController {
  constructor(private readonly hotelImagesService: HotelImagesService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ModelNotFound([{ model: 'Hotel', field: 'hotelId' }])
  @UseInterceptors(
    ModelNotFoundInterceptor,
    FilesInterceptor('images', null, { dest: './uploads' }),
  )
  @ApiOperation({ summary: 'Upload images for a hotel' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'file',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiBearerAuth()
  async upload(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @UploadedFiles() images: Express.Multer.File[],
    @Res() res,
  ): Promise<Response> {
    for (const image of images) {
      await this.hotelImagesService.create(hotelId, {
        originalName: image.originalname,
        fileName: image.filename,
        mimeType: image.mimetype,
        path: image.path,
        size: image.size,
      });
    }

    return res.json({ message: 'Image upload successfully' });
  }

  @Get(':id')
  @ModelNotFound([
    { model: 'Hotel', field: 'hotelId' },
    { model: 'HotelImage', field: 'id' },
  ])
  @UseInterceptors(ModelNotFoundInterceptor)
  @ApiOperation({ summary: 'Get a hotel image by id' })
  @ApiResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
    status: HttpStatus.OK,
  })
  async getPreview(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ): Promise<ReadableStream> {
    const file = await this.hotelImagesService.findById(id);

    const stream = createReadStream(join(process.cwd(), file.path));

    return stream.pipe(res);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ModelNotFound([
    { model: 'Hotel', field: 'hotelId' },
    { model: 'HotelImage', field: 'id' },
  ])
  @UseInterceptors(ModelNotFoundInterceptor)
  @ApiOperation({ summary: 'Delete a hotel image by id' })
  @ApiBearerAuth()
  async delete(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HotelImage> {
    return await this.hotelImagesService.delete(id);
  }
}
