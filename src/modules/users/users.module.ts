import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { PrismaModule } from '../../providers/prisma';
import { CommonModule } from '../../common';

@Module({
  imports: [PrismaModule, CommonModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
