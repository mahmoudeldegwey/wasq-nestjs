import {
  IsNotEmpty,
  IsNumberString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsNumberString()
  phone_number: number;
  
  @IsNotEmpty()
  @MinLength(6)
  password: string

}