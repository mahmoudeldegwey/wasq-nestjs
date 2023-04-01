import { AuthService } from './auth.service';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    confirmPhoneNumber(PhoneNumberDto: PhoneNumberDto): {
        code: number;
    };
    register(RegisterDto: RegisterDto): Promise<{
        id: any;
        email: string;
        username: string;
        phone_number: number;
        access_token: string;
        status?: undefined;
        error?: undefined;
        errors?: undefined;
    } | {
        status: number;
        error: boolean;
        errors: any;
        id?: undefined;
        email?: undefined;
        username?: undefined;
        phone_number?: undefined;
        access_token?: undefined;
    }>;
    login(LoginDto: LoginDto): Promise<{
        status: number;
        error: boolean;
        message: string;
        id?: undefined;
        email?: undefined;
        username?: undefined;
        phone_number?: undefined;
        access_token?: undefined;
        errors?: undefined;
    } | {
        id: any;
        email: string;
        username: string;
        phone_number: number;
        access_token: string;
        status?: undefined;
        error?: undefined;
        message?: undefined;
        errors?: undefined;
    } | {
        status: number;
        error: boolean;
        errors: any;
        message?: undefined;
        id?: undefined;
        email?: undefined;
        username?: undefined;
        phone_number?: undefined;
        access_token?: undefined;
    }>;
    checkUserExistByPhone(PhoneNumberDto: PhoneNumberDto): Promise<{
        status: number;
        error: boolean;
        message: string;
        code?: undefined;
        errors?: undefined;
    } | {
        code: string;
        status?: undefined;
        error?: undefined;
        message?: undefined;
        errors?: undefined;
    } | {
        status: number;
        error: boolean;
        errors: any;
        message?: undefined;
        code?: undefined;
    }>;
    updatePasswordByPhoneNumber(UpdatePasswordDto: UpdatePasswordDto): Promise<{
        status: number;
        error: boolean;
        message: string;
        errors?: undefined;
    } | {
        status: number;
        message: string;
        error?: undefined;
        errors?: undefined;
    } | {
        status: number;
        error: boolean;
        errors: any;
        message?: undefined;
    }>;
}
