import { Module } from '@nestjs/common';
//import { CatsController } from './cats/cats.controller';
//import { CatsModule } from './cats/cats.module';
//import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { DevicesModule } from './devices/devices.module';
import { BrandsModule } from './brands/brands.module';
import { GovernorateModule } from './governorate/governorate.module';
import { CityModule } from './city/city.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule, 
    AuthModule, 
    DevicesModule, 
    BrandsModule, 
    GovernorateModule, 
    CityModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
