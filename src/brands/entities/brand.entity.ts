import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    tableName: 'brands',
    //timestamps: false,
  })
export class Brand extends Model {

    @Column
  type: string;
  
    @Column
  name: string;
}
