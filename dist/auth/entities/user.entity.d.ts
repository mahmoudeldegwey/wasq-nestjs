import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    username: string;
    email: string;
    phone_number: number;
    password: string;
}
