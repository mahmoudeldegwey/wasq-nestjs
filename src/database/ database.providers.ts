import { Sequelize } from 'sequelize-typescript';
import { User } from '../auth/entities/user.entity';
//import db from '../db';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: '127.0.0.1',  //process.env.DB_HOST,
        port: 3306,
        username: 'eldegweydev2023_user', //'root',  //process.env.DB_USERNAME,
        password: '}8$b{KfwYzU5',  //'root', //process.env.DB_PASSWORD,
        database: 'eldegweydev2023_wasq' //'wasq-nestjs' //process.env.DB_DATABASE,
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
