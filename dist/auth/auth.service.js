"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const argon = require("argon2");
let AuthService = class AuthService {
    confirmPhoneNumber(confirmPhonenumberAuht) {
        const phone_number = confirmPhonenumberAuht.phone_number;
        return { code: 132456 };
    }
    async register(RegisterDto) {
        const { phone_number, password } = RegisterDto;
        const hashPassword = await argon.hash(password);
        const user = await user_entity_1.User.create({
            phone_number: phone_number,
            password: hashPassword,
        });
        return await user_entity_1.User.findOne({
            where: { id: user.id },
        });
    }
    login() {
        return 'login';
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map