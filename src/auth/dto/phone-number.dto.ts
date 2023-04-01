import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PhoneNumberDto {
  @IsNotEmpty()
  @IsNumberString()
  phone_number: number;

}