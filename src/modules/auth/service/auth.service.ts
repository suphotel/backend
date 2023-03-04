import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../users';
import { RegisterDto } from '../dto/register.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../../../common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async register(payload: RegisterDto): Promise<User> {
    const userExistByEmail = await this.usersService.findByEmail(payload.email);

    if (userExistByEmail) {
      throw new BadRequestException('Email already taken');
    }

    const userExistByPseudo = await this.usersService.findByPseudo(
      payload.pseudo,
    );

    if (userExistByPseudo) {
      throw new BadRequestException('Pseudo already taken');
    }

    return await this.usersService.create({
      ...payload,
    });
  }

  async validateUserCredentials(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (
      user &&
      (await this.passwordService.comparePassword(pass, user.password))
    ) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async whoami(userId: number): Promise<User> {
    return await this.usersService.findById(userId);
  }

  async deleteMyAccount(userId: number): Promise<User> {
    return await this.usersService.delete(userId);
  }
}
