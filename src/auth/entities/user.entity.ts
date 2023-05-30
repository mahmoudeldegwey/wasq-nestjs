import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { City } from 'src/city/entities/city.entity';
import { Governorate } from 'src/governorate/entities/governorate.entity';

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

  @ForeignKey(() => City)
  @Column
  city_id: number;

  @BelongsTo(() => City)
  city: City;

  @ForeignKey(() => Governorate)
  @Column
  governorate_id: number;

  @BelongsTo(() => Governorate)
  governorate: Governorate;

  
  @Column
  address: string;


}
