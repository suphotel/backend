import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { User } from '@prisma/client';
import { RegisterDto, registerSchema } from '../dto/register.dto';
import { JwtAuthGuard, LocalAuthGuard } from '../../../common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(
    @Body(new JoiValidationPipe(registerSchema)) data: RegisterDto,
  ): Promise<User> {
    return await this.authService.register(data);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req): Promise<any> {
    return await this.authService.login(req.user);
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get the current user' })
  @ApiBearerAuth()
  async whoami(@Request() req): Promise<User> {
    return req.user;
  }

  @Delete('delete-my-account')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete the current user' })
  @ApiBearerAuth()
  async deleteMyAccount(@Request() req): Promise<User> {
    return await this.authService.deleteMyAccount(parseInt(req.user.id));
  }
}
