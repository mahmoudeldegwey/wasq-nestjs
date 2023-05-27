import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GovernorateService } from './governorate.service';
import { CreateGovernorateDto } from './dto/create-governorate.dto';
import { UpdateGovernorateDto } from './dto/update-governorate.dto';

@Controller('governorate')
export class GovernorateController {
  constructor(private readonly governorateService: GovernorateService) {}

  @Post()
  create(@Body() createGovernorateDto: CreateGovernorateDto) {
    return this.governorateService.create(createGovernorateDto);
  }

  @Get()
  findAll() {
    return this.governorateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.governorateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGovernorateDto: UpdateGovernorateDto) {
    return this.governorateService.update(+id, updateGovernorateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.governorateService.remove(+id);
  }
}
