"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("sequelize");
let AuthService = class AuthService {
    constructor(jwt) {
        this.jwt = jwt;
    }
    confirmPhoneNumber(PhoneNumberDto) {
        const phone_number = PhoneNumberDto.phone_number;
        return { code: 132456 };
    }
    async register(RegisterDto) {
        try {
            const { phone_number, password } = RegisterDto;
            const salt = await bcrypt.genSalt();
            const hashPassword = bcrypt.hashSync(password, salt);
            const user = await user_entity_1.User.create({
                phone_number: phone_number,
                password: hashPassword,
            });
            const token = await this.signToken(user);
            return {
                id: user.id,
                email: user.email,
                username: user.username,
                phone_number: user.phone_number,
                access_token: token.access_token,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                error: true,
                errors: error.errors,
            };
        }
    }
    async login(LoginDto) {
        try {
            const { phone_number_or_email, password } = LoginDto;
            const user = await user_entity_1.User.findOne({
                attributes: ['id', 'username', 'phone_number', 'email', 'password'],
                where: {
                    [sequelize_1.Op.or]: [
                        { email: phone_number_or_email },
                        { phone_number: phone_number_or_email },
                    ],
                }
            });
            if (!user) {
                return {
                    status: 500,
                    error: true,
                    message: 'not found user',
                };
            }
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return {
                    status: 500,
                    error: true,
                    message: 'incroect password',
                };
            }
            const token = await this.signToken(user);
            return {
                id: user.id,
                email: user.email,
                username: user.username,
                phone_number: user.phone_number,
                access_token: token.access_token,
            };
        }
        catch (error) {
            return {
                status: 500,
                error: true,
                errors: error.errors,
            };
        }
    }
    async checkUserExistByPhone(PhoneNumberDto) {
        try {
            const phone_number = PhoneNumberDto.phone_number;
            const user = await user_entity_1.User.findOne({
                where: { phone_number: phone_number },
            });
            if (!user) {
                return {
                    status: 500,
                    error: true,
                    message: 'not found user',
                };
            }
            return { code: '123456' };
        }
        catch (error) {
            return {
                status: 500,
                error: true,
                errors: error.errors,
            };
        }
    }
    async updatePasswordByPhoneNumber(UpdatePasswordDto) {
        try {
            const { phone_number, password } = UpdatePasswordDto;
            const user = await user_entity_1.User.findOne({
                where: { phone_number: phone_number },
            });
            if (!user) {
                return {
                    status: 500,
                    error: true,
                    message: 'not found user',
                };
            }
            const salt = await bcrypt.genSalt();
            const hashPassword = bcrypt.hashSync(password, salt);
            user_entity_1.User.update({ password: hashPassword }, {
                where: {
                    phone_number: phone_number,
                },
            });
            return {
                status: 201,
                message: 'Update Password Succesffully',
            };
        }
        catch (error) {
            return {
                status: 500,
                error: true,
                errors: error.errors,
            };
        }
    }
    async signToken(User) {
        const payload = {
            sub: User.id,
            User
        };
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '43829.0639m',
            secret: 'super-secret'
        });
        return {
            access_token: token
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map