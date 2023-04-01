import {
  IsNotEmpty,
  IsNumberString,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsNumberString()
  phone_number: number;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

}