import { IsOptional, IsString } from 'class-validator';

export class UpdateHotelDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  description: string;
}
