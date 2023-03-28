import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  }
})
export class User extends Model {
//   @Column
//   id: number;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  phone_number: number;
  
  @Column
  password: string;
}
