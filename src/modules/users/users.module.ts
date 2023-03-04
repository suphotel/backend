import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { PrismaModule } from '../../providers/prisma';
import { CommonModule } from '../../common';
import { UsersController } from './controller/users.controller';

@Module({
  imports: [PrismaModule, CommonModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
