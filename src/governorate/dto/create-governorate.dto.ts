import { IsNotEmpty } from 'class-validator';
export class CreateGovernorateDto {
    @IsNotEmpty()
    name: string;
}
