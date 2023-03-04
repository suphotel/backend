import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  pseudo: Joi.string().required(),
  password: Joi.string().min(3).max(15).required().label('Password'),
  passwordConfirmation: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),
});

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  pseudo: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordConfirmation: string;
}
