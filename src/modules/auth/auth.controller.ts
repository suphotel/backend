import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<User> {
    return await this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  async whoami(@Request() req): Promise<User> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-my-account')
  async deleteMyAccount(@Request() req): Promise<User> {
    return await this.authService.deleteMyAccount(parseInt(req.user.userId));
  }
}
