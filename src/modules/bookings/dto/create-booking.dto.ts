import { IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
