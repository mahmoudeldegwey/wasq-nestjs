import { AuthService } from './auth.service';
import { confirmPhonenumberAuht } from './dto/confirm-phonenumber-auht.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    confirmPhoneNumber(confirmPhonenumberAuht: confirmPhonenumberAuht): {
        code: number;
    };
    register(RegisterDto: RegisterDto): Promise<import("./entities/user.entity").User>;
    login(): string;
}
