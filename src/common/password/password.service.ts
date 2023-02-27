import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class PasswordService {
  get bcryptSaltRounds(): number {
    return 10;
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
