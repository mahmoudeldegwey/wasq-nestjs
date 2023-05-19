import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  async create(CreateBrandDto: CreateBrandDto) {
    try {
        const { name, type } = CreateBrandDto;
        
        const brand = await Brand.create({
        type: type,
        name: name,
      });

      return brand;
    } catch (error) {

      return {
        status: 500,
        error: true,
        errors: error
      }
    }
  }

  async findAll(type: string) {
    try {
      return await Brand.findAll({ where: { type: type } });
    } catch (error) {
      return {
        status:500,
        error:true,
        errors: error,
      }
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
