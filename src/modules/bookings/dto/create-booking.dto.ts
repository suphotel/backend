import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export const createBookingSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

export class CreateBookingDto {
  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}
