import { PhoneNumberDto } from './dto/phone-number.dto';
import { Injectable, Req } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfirmCodeDto } from './dto/confirm-code.dto';
import { UpdateUserDto } from './dto/update-user.dto';


import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User as UserGuard } from '../auth/decorator/user.decorator';
import { User as UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async register(RegisterDto: RegisterDto) {
    try {
      const { phone_number, password } = RegisterDto;

      const salt = await bcrypt.genSalt();
      const hashPassword = bcrypt.hashSync(password, salt);

      const user = await User.create({
        phone_number: phone_number,
        password: hashPassword,
        confirm_code: 123456,
      });

      return {
        status: 201,
        message: 'User, Created Succesffully',
        confirm_code: user.confirm_code,
      }
      
    } catch (error) {
     // console.log(error)
      return {
        status:500,
        error:true,
        errors: error.errors,
      };
    }
  }

  async confirmCodeByPhoneNumber(ConfirmCodeDto: ConfirmCodeDto) {
    const { phone_number, confirm_code } = ConfirmCodeDto;

    const user = await User.findOne({
      attributes: ['id', 'username', 'phone_number', 'email', 'password'],
      where: { phone_number: phone_number, confirm_code: confirm_code },
    });

    if (!user) {
      return {
        status: 500,
        error: true,
        message: 'not found user,or incorrect confirmation code',
      }
    }

    const token = await this.signToken(user);

    await User.update(
      { 
        status: 1, 
        confirm_code: null,
        confirmed_at: new Date(),
      },
      {
        where: { phone_number: phone_number },
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      phone_number: user.phone_number,
      confirm_code: user.confirm_code,
      access_token: token.access_token,
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
            { phone_number: phone_number_or_email }
          ],
          status: 1,
          confirm_code: null,
        }
      });

      if (!user) {
        return {
          status: 500,
          error: true,
          message: 'not found user,or not active',
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
    try {
      const phone_number = PhoneNumberDto.phone_number;

      const user = await User.findOne({
        where: { 
          phone_number: phone_number, 
          status: 1,
          confirm_code: null,
        },
      });

      if (!user) {
        return {
          status: 500,
          error: true,
          message: 'not found user, or not active user',
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

  async updateUserData(@Req() req, @UserGuard() user: UserEntity) {
    try {
      const { email, city_id, governorate_id, address, username } = req.body;
      //console.log(email)
      await User.update(
        {
          username: username,
          email: email,
          city_id: city_id,
          governorate_id: governorate_id,
          address: address
        },
        {
          where: {
            id: user.id,
          },
      });

      return {
        status: 201,
        message: 'Update Date Succesffully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          phone_number: user.phone_number,
          confirm_code: user.confirm_code,
        },
      }

    }catch(error){
      console.log(error)
      return {
        status: 500,
        error: true,
        errors: error,
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
