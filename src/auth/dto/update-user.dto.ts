import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsString()
  email: string;

  @IsString()
  address: string

  @IsString()
  phone_number: number;
  
  @IsString()
  city_id: number;


}