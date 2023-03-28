import { IsNotEmpty, IsNumberString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsNumberString()
  phone_number: number;

  @IsNotEmpty()
  password: string;

}