import { Sequelize } from 'sequelize-typescript';
import { User } from '../auth/entities/user.entity';
import { Device } from '../devices/entities/device.entity';

//import db from '../db';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: '127.0.0.1',  //process.env.DB_HOST,
        port: 3306,
        username: 'root', //'eldegweydev2023_user',  //process.env.DB_USERNAME,
        password: 'root',  //'}8$b{KfwYzU5', //process.env.DB_PASSWORD,
        database: 'wasq-nestjs' //eldegweydev2023_wasq //process.env.DB_DATABASE,
      });
      sequelize.addModels([User, Device]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
