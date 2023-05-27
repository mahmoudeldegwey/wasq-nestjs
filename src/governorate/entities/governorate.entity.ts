import { Table, Column, Model } from 'sequelize-typescript';
@Table({
    tableName: 'governorates',
    //timestamps: false,
})
export class Governorate extends Model {

    @Column
    country_id: number;
    
    @Column
    name: string;

}

