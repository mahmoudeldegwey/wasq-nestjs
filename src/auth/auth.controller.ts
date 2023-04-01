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
import { PhoneNumberDto } from './dto/phone-number.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/confirm-phone-number')
  confirmPhoneNumber(@Body() PhoneNumberDto: PhoneNumberDto) {
    return this.authService.confirmPhoneNumber(PhoneNumberDto);
  }

  @Post('register')
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Post('check-user-exist-by-phone')
  checkUserExistByPhone(@Body() PhoneNumberDto:PhoneNumberDto){
    return this.authService.checkUserExistByPhone(PhoneNumberDto)
  }

  @Post('update-password-phone')
  updatePasswordByPhoneNumber(@Body() UpdatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePasswordByPhoneNumber(UpdatePasswordDto)
  }

}
