import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'devices',
  //timestamps: false,
})
export class Device extends Model {
  @Column
  user_id: number;

  @Column
  device_type: string;

  @Column
  brand: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  serial_number: string;

  @Column
  mac_address: string;

  @Column
  screen_size: string;

  @Column
  storage: string;

  @Column
  ram_size: string;

  @Column
  user_address: string;


}
  