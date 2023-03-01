import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsDateString()
  @IsOptional()
  @ApiProperty()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  endDate: Date;
}
