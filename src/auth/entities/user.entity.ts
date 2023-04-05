import {
  Table,
  Column,
  Model
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  //timestamps: false,
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  }
})
export class User extends Model {

  @Column
  username: string;

  @Column
  email: string;

  @Column
  phone_number: number;
  
  @Column
  password: string;

  @Column
  confirm_code: number;

  @Column
  status: boolean

  @Column
  confirmed_at: Date;

  @Column
  city_id: number;

  @Column
  address: string;


}
