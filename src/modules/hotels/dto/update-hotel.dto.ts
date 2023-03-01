import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export const updateHotelSchema = Joi.object({
  name: Joi.string(),
  location: Joi.string(),
  description: Joi.string(),
});

export class UpdateHotelDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  description: string;
}
