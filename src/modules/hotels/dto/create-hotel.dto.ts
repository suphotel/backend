import { IsString } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  description: string;
}
