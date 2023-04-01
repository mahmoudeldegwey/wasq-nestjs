import { IsNotEmpty, IsNumberString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsNumberString()
  phone_number_or_email: string;

  @IsNotEmpty()
  password: string;

}