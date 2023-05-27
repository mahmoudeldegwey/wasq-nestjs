import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'cities',
  //timestamps: false,
})
export class City extends Model {

    @Column
    governorate_id: number;
  
    @Column
    name: string;

    @Column
    latitude: string;

    @Column
    longitude: string;    

}
