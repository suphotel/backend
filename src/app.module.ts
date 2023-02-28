import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { HotelsModule } from './modules/hotels/hotels.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, CommonModule, HotelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
