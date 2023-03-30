import { Injectable } from '@nestjs/common';
import { confirmPhonenumberAuht } from './dto/confirm-phonenumber-auht.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
//import * as argon from "argon2";

@Injectable()
export class AuthService {
  confirmPhoneNumber(confirmPhonenumberAuht: confirmPhonenumberAuht) {
    const phone_number: number = confirmPhonenumberAuht.phone_number;
    return { code: 132456 };
  }

  async register(RegisterDto: RegisterDto) {
    const { phone_number, password } = RegisterDto;
    const hashPassword = password; //await argon.hash(password);
    const user = await User.create({
      phone_number: phone_number,
      password: hashPassword,
    });

    return await User.findOne({
      where: { id: user.id },
    });
  }

  login() {
    return 'login';
  }
}
