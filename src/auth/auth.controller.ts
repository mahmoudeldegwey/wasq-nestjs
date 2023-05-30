import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ConfirmCodeDto } from './dto/confirm-code.dto';

import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/decorator/user.decorator';
import { User as UserEntity } from '../auth/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }

  @Post('/confirm-code-by-phone-number')
  confirmCodeByPhoneNumber(@Body() ConfirmCodeDto: ConfirmCodeDto) {
    return this.authService.confirmCodeByPhoneNumber(ConfirmCodeDto);
  }

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Post('check-user-exist-by-phone')
  checkUserExistByPhone(@Body() PhoneNumberDto: PhoneNumberDto) {
    return this.authService.checkUserExistByPhone(PhoneNumberDto);
  }

  @Post('update-password-phone')
  updatePasswordByPhoneNumber(@Body() UpdatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePasswordByPhoneNumber(UpdatePasswordDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Put('update-user-data')
  updateUserData(@Req() req,@User() user: UserEntity) {
    return this.authService.updateUserData(req,user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }


}
