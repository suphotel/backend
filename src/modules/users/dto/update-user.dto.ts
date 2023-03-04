import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { Role } from '@prisma/client';

export const updateUserSchema = Joi.object({
  email: Joi.string(),
  pseudo: Joi.string(),
  role: Joi.string(),
});

export class UpdateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  pseudo: string;

  @ApiProperty()
  role: Role;
}
