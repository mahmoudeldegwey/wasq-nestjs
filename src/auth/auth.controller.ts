import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { confirmPhonenumberAuht } from './dto/confirm-phonenumber-auht.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/confirm-phone-number')
  confirmPhoneNumber(@Body() confirmPhonenumberAuht: confirmPhonenumberAuht) {
    return this.authService.confirmPhoneNumber(confirmPhonenumberAuht);
  }

  @Post('register')
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
