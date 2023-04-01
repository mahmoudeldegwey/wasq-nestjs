import { PhoneNumberDto } from './dto/phone-number.dto';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  confirmPhoneNumber(PhoneNumberDto: PhoneNumberDto) {
    const phone_number: number = PhoneNumberDto.phone_number;
    return { code: 132456 };
  }

  async register(RegisterDto: RegisterDto) {
    try {
      const { phone_number, password } = RegisterDto;

      const salt = await bcrypt.genSalt();
      const hashPassword = bcrypt.hashSync(password, salt);

      const user = await User.create({
        phone_number: phone_number,
        password: hashPassword,
      });

      const token = await this.signToken(user);

      return {
        id: user.id,
        email: user.email,
        username: user.username,
        phone_number: user.phone_number,
        access_token: token.access_token,
      }
      
    } catch (error) {
      console.log(error)
      return {
        status:500,
        error:true,
        errors: error.errors,
      };
    }
  }

  async login(LoginDto: LoginDto) {
    try {
      const { phone_number_or_email, password } = LoginDto;

      const user = await User.findOne({
        attributes: ['id', 'username', 'phone_number', 'email', 'password'],
        where: {
          [Op.or]: [
            { email: phone_number_or_email },
            { phone_number: phone_number_or_email },
          ],
        }
      });

      if(!user) {
        return {
          status: 500,
          error: true,
          message: 'not found user',
        }
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return {
          status: 500,
          error: true,
          message: 'incroect password',
        }
      }

      const token = await this.signToken(user);

      return {
        id: user.id,
        email: user.email,
        username: user.username,
        phone_number: user.phone_number,
        access_token: token.access_token,
      }

    } catch (error) {
      return {
        status:500,
        error:true,
        errors: error.errors,
      };
    }

  }

  async checkUserExistByPhone(PhoneNumberDto: PhoneNumberDto){
    try{

      const phone_number = PhoneNumberDto.phone_number 

      const user = await User.findOne({
        where: { phone_number: phone_number },
      });

      if (!user) {
        return {
          status: 500,
          error: true,
          message: 'not found user',
        }
      }

      return { code: '123456' };
    } catch (error) {
      return {
        status: 500,
        error: true,
        errors: error.errors,
      };
    }
  }

  async updatePasswordByPhoneNumber(UpdatePasswordDto: UpdatePasswordDto){
    try {
      const { phone_number, password } = UpdatePasswordDto;

      const user = await User.findOne({
        where: { phone_number: phone_number },
      });

      if (!user) {
        return {
          status: 500,
          error: true,
          message: 'not found user',
        }
      }

      const salt = await bcrypt.genSalt();
      const hashPassword = bcrypt.hashSync(password, salt);

      User.update(
        { password: hashPassword },
        {
          where: {
            phone_number: phone_number,
          },
      });
      
      return {
        status: 201,
        message: 'Update Password Succesffully',
      }

    } catch (error) {
      return {
        status: 500,
        error: true,
        errors: error.errors,
      };
    } 
  }

  async signToken(User: User) : Promise<{access_token:string}> {
    const payload = {
      sub: User.id,
      User
    }

    const token = await this.jwt.signAsync(payload,{
      expiresIn: '43829.0639m',
      secret: 'super-secret'
    })

    return {
      access_token: token
    }
    
  }
  
}
