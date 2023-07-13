import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from 'src/auth/entities/user.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { City } from 'src/city/entities/city.entity';
import { Governorate } from 'src/governorate/entities/governorate.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Device, Brand,City , Governorate]);
      await sequelize.sync();
      return sequelize;
    },
}];