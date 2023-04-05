import { Injectable, Delete, Req } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { Op } from 'sequelize';
import { User } from '../auth/decorator/user.decorator';
import { User as UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class DevicesService {
  async create(CreateDeviceDto: CreateDeviceDto, @User() user: UserEntity) {
    try{
      const {
        device_type,
        brand,
        name,
        description,
        serial_number,
        mac_address,
        screen_size,
        storage,
        ram_size,
        user_address,
      } = CreateDeviceDto;
      
      const device = await Device.create({
        user_id: user.id, //user_id,
        device_type: device_type,
        brand: brand,
        name: name,
        description: description,
        serial_number: serial_number,
        mac_address: mac_address,
        screen_size : screen_size,
        storage: storage,
        ram_size: ram_size,
        user_address: user_address
      })

      return device

    } catch(error){

      return {
        status:500,
        error:true,
        errors: error,
      }
    }
  }


  async findAll(@User() user: UserEntity) {
    try{
      const devices = await Device.findAll({ where: { user_id: user.id } });

      return devices

    } catch(error){
      return {
        status:500,
        error:true,
        errors: error,
      }
    }
  }

  async findOne(id: string) {
    try{      

      const device = await Device.findOne({
        where: {
          [Op.or]: [{ id: id }, { serial_number: id }],
        }
      })
      return device

    } catch(error){
      return {
        status:500,
        error:true,
        errors: error,
      }
    }
  }

  async update(id: number, UpdateDeviceDto: UpdateDeviceDto) {
    try {
      const {
        device_type,
        brand,
        name,
        description,
        serial_number,
        mac_address,
        screen_size,
        storage,
        ram_size,
        user_address,
      } = UpdateDeviceDto;

      const device = await Device.update(
        { 
          device_type: device_type,
          brand: brand,
          name: name,
          description: description,
          serial_number: serial_number,
          mac_address: mac_address,
          screen_size: screen_size,
          storage: storage,
          ram_size: ram_size,
          user_address: user_address
         },
        {
          where: {
            id: id,
          },
      })

      return {
        status: 201,
        message: 'Updated Successfully'
      }

    } catch (error) {
      return {
        status: 500,
        error: true,
        errors: error,
      }
    }
  }

  async remove(id: number) {
    try{
      
      await Device.destroy({ where: { id: id } });
      
      return {
        status:201,
        message:"Deleted Successfully"
      }

    }catch (error){
      return {
        status:500,
        error:true,
        errors: error,
      }
    }
  }
}
