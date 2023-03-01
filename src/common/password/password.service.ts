import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  get bcryptSaltRounds(): number {
    return parseInt(process.env.BCRYPT_SALT_OR_ROUNDS) || 10;
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, this.bcryptSaltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
