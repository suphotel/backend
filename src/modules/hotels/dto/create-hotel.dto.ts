import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export const createHotelSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
});

export class CreateHotelDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  description: string;
}
