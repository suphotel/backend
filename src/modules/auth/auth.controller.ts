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
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<User> {
    return await this.authService.register(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('whoami')
  async whoami(@Request() req): Promise<User> {
    return await this.authService.whoami(parseInt(req.user.userId));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete-my-account')
  async deleteMyAccount(@Request() req): Promise<User> {
    return await this.authService.deleteMyAccount(parseInt(req.user.userId));
  }
}
