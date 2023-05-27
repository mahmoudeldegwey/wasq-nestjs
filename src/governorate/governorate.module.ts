import { Module } from '@nestjs/common';
import { GovernorateService } from './governorate.service';
import { GovernorateController } from './governorate.controller';

@Module({
  controllers: [GovernorateController],
  providers: [GovernorateService]
})
export class GovernorateModule {}
