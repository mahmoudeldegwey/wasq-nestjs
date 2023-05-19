import { Module } from '@nestjs/common';
//import { CatsController } from './cats/cats.controller';
//import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { DevicesModule } from './devices/devices.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [DatabaseModule, AuthModule, DevicesModule, BrandsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
