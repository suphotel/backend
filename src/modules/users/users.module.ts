import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
