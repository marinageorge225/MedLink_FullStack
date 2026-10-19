import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginInput,
  RegisterInput,
  loginSchema,
  registerSchema,
} from '@medlink/shared';
import { ZodValidationPipe } from '../../common/pipes/validation.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new patient or doctor' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() body: RegisterInput) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'JWT access token and profile returned' })
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() body: LoginInput) {
    return this.authService.login(body);
  }
}
