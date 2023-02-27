import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './providers/prisma/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
