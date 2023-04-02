import { IsNotEmpty, IsNumberString } from 'class-validator';
import { PhoneNumberDto } from './phone-number.dto';

export class ConfirmCodeDto extends PhoneNumberDto {
  @IsNotEmpty()
  @IsNumberString()
  confirm_code: number;

}