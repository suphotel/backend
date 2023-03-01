import { Module } from '@nestjs/common';

import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

import { AppController, AppService } from './app';

import { PrismaModule } from './providers/prisma';
import { CommonModule } from './common';

import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { HotelsModule } from './modules/hotels';
import { HotelImagesModule } from './modules/hotel-images';
import { BookingsModule } from './modules/bookings';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    CommonModule,
    HotelsModule,
    HotelImagesModule,
    BookingsModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
