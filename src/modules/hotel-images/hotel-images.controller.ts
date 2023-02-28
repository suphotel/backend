import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
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

@Controller('hotels/:hotelId/images')
export class HotelImagesController {
  constructor(private readonly hotelImagesService: HotelImagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('images', null, { dest: './uploads' }))
  async upload(
    @Param('hotelId') hotelId,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res,
  ) {
    for (const file of files) {
      await this.hotelImagesService.create(parseInt(hotelId), {
        originalName: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        path: file.path,
        size: file.size,
      });
    }

    return res.json({ message: 'Image upload successfully' });
  }

  @Get(':id')
  async getPreview(@Param('id') id: string, @Res() res) {
    const file = await this.hotelImagesService.findById(parseInt(id));

    if (!file) {
      throw new NotFoundException();
    }

    const stream = createReadStream(join(process.cwd(), file.path));

    return stream.pipe(res);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async delete(@Param('id') id: string) {
    return await this.hotelImagesService.delete(parseInt(id));
  }
}
