import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { User } from '@prisma/client';
import { JwtAuthGuard, RoleGuard, Roles } from '../../../common';
import { ModelNotFound, ModelNotFoundInterceptor } from '../../../common';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { UpdateUserDto, updateUserSchema } from '../dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Return all users' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findMany();
  }

  @Put(':id')
  @ModelNotFound([{ model: 'User', field: 'id' }])
  @UseInterceptors(ModelNotFoundInterceptor)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Update a user' })
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Protected by admin role' })
  @ApiOkResponse({ description: 'User updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(updateUserSchema)) body: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, body);
  }
}
