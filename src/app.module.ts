import { Module } from '@nestjs/common';
//import { CatsController } from './cats/cats.controller';
//import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
