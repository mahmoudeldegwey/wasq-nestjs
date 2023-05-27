import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/decorator/user.decorator';
import { User as UserEntity } from '../auth/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('/create')
  create(@Body() CreateDeviceDto: CreateDeviceDto, @User() user: UserEntity) {
    //console.log(user.id)
    return this.devicesService.create(CreateDeviceDto, user);
  }

  @Get('/all')
  findAll(@User() user: UserEntity) {
    return this.devicesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }

  @Get('/types')
  getAllTypes(){
    return this.devicesService.getAllTypes();
  }

}
