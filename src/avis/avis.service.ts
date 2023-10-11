import { Injectable } from '@nestjs/common';
import { CreateAviDto } from './dto/create-avi.dto';
import { UpdateAviDto } from './dto/update-avi.dto';

@Injectable()
export class AvisService {
  create(createAviDto: CreateAviDto) {
    return 'This action adds a new avi';
  }

  findAll() {
    return `This action returns all avis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} avi`;
  }

  update(id: number, updateAviDto: UpdateAviDto) {
    return `This action updates a #${id} avi`;
  }

  remove(id: number) {
    return `This action removes a #${id} avi`;
  }
}
