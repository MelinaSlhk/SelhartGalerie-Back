import { Injectable } from '@nestjs/common';
import { CreateTableauDto } from './dto/create-tableau.dto';
import { UpdateTableauDto } from './dto/update-tableau.dto';

@Injectable()
export class TableauService {
  create(createTableauDto: CreateTableauDto) {
    return 'This action adds a new tableau';
  }

  findAll() {
    return `This action returns all tableau`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tableau`;
  }

  update(id: number, updateTableauDto: UpdateTableauDto) {
    return `This action updates a #${id} tableau`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableau`;
  }
}
