import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString()
  @ApiProperty()
  description: string;
}
