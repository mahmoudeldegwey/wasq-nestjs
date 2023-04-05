import { IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
    @IsNotEmpty()
    device_type: string;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    serial_number: string;

    @IsNotEmpty()
    screen_size: string;

    @IsNotEmpty()
    storage: string;

    @IsNotEmpty()
    ram_size: string;

    @IsNotEmpty()
  user_address: string;

  mac_address:string
}
