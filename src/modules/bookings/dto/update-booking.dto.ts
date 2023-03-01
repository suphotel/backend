import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export const updateBookingSchema = Joi.object({
  startDate: Joi.date(),
  endDate: Joi.date(),
});

export class UpdateBookingDto {
  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}
