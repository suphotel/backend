import {
  Controller,
  Delete,
  Get,
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
import { HotelImagesService } from './hotel-images.service';
import { join } from 'path';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ModelNotFoundInterceptor } from '../../common/interceptors/model-not-found.interceptor';
import { ModelNotFound } from '../../common/decorators/model-not-found.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { HotelImage } from '@prisma/client';

@Controller('hotels/:hotelId/images')
export class HotelImagesController {
  constructor(private readonly hotelImagesService: HotelImagesService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ModelNotFound(['Hotel', 'hotelId'])
  @UseInterceptors(
    ModelNotFoundInterceptor,
    FilesInterceptor('images', null, { dest: './uploads' }),
  )
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
  @ModelNotFound(['HotelImage', 'id'])
  @UseInterceptors(ModelNotFoundInterceptor)
  async getPreview(
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
  @ModelNotFound(['HotelImage', 'id'])
  @UseInterceptors(ModelNotFoundInterceptor)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<HotelImage> {
    return await this.hotelImagesService.delete(id);
  }
}
