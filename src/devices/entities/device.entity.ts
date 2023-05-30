import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';

@Table({
  tableName: 'devices',
  //timestamps: false,
})
export class Device extends Model {
  
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;

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
  