import { confirmPhonenumberAuht } from './dto/confirm-phonenumber-auht.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
export declare class AuthService {
    confirmPhoneNumber(confirmPhonenumberAuht: confirmPhonenumberAuht): {
        code: number;
    };
    register(RegisterDto: RegisterDto): Promise<User>;
    login(): string;
}
