import { IsNotEmpty, IsNumberString } from 'class-validator';

export class confirmPhonenumberAuht {
  @IsNotEmpty()
  @IsNumberString()
  phone_number: number;
}