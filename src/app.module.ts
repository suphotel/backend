import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { HotelImagesModule } from './modules/hotel-images/hotel-images.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BookingsModule } from './modules/bookings/bookings.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
