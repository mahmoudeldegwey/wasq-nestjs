import { Injectable } from '@nestjs/common';
import { CreateGovernorateDto } from './dto/create-governorate.dto';
import { UpdateGovernorateDto } from './dto/update-governorate.dto';
import { Governorate } from './entities/governorate.entity';

@Injectable()
export class GovernorateService {
  create(createGovernorateDto: CreateGovernorateDto) {
    return 'This action adds a new governorate';
  }

  async findAll() {
    try {
      return  await Governorate.findAll();
    } catch (error) {
      return {
        status:500,
        error:true,
        errors: error,
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} governorate`;
  }

  update(id: number, updateGovernorateDto: UpdateGovernorateDto) {
    return `This action updates a #${id} governorate`;
  }

  remove(id: number) {
    return `This action removes a #${id} governorate`;
  }
}
