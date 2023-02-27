import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  pseudo: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;
}
