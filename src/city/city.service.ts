import { Injectable, Req } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { Governorate as GovernorateModel } from 'src/governorate/entities/governorate.entity';

@Injectable()
export class CityService {
  async create(@Req() req) {
    try{
      const {governorates} = req.body;

      await governorates.forEach(governorate => {
        let createGov =  GovernorateModel.create({ name: governorate.name });
        createGov.then((value) => {
          governorate?.regions.forEach((city) => {
            City.create({
              governorate_id: value.id,
              name: city.name,
              latitude: city.latitude != 0 ? city.latitude :null,
              longitude: city.longitude != 0 ? city.longitude :null
            })
          });
        })

      });

      return {
        status: 201,
        message: 'Created Succesffully',
      }

    } catch (error) {
      console.log(error)
    }
  }

  async findAll(governorate_id: number) {
    try {
      return await City.findAll({ where: { governorate_id: governorate_id } });
    } catch (error) {
      return {
        status:500,
        error:true,
        errors: error,
      }
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
