import { IsDateString, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate: Date;
}
