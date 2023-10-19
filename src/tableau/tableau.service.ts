import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableauDto } from './dto/create-tableau.dto';
import { UpdateTableauDto } from './dto/update-tableau.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tableau } from './entities/tableau.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TableauService {
  constructor(
    @InjectRepository(Tableau) private tableauxRepository: Repository<Tableau>,
  ) {}
  async create(createTableauDto: CreateTableauDto) {
    const tableau= this.tableauxRepository.create(createTableauDto);
    const result = await this.tableauxRepository.save(tableau);
    return result;
    // return 'This action adds a new tableau';
  }

  async findAll() {
    return await this.tableauxRepository.find(); 
    //`This action returns all tableau`;
  }

  async findOne(id: number) {
    const found = await this.tableauxRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Tableaux avec l'id ${id} introuvable`);
    }
    return found;
    // return `This action returns a #${id} tableau`;
  }

  async update(id: number, updateTableauDto: UpdateTableauDto) {
     const tableau = await this.findOne(id);
     const newTableau = this.tableauxRepository.merge(tableau, updateTableauDto);
     const result = await this.tableauxRepository.save(newTableau);
     return result;
    // return `This action updates a #${id} tableau`;
  }

  async remove(id: number) {
     const found = await this.findOne(id);
     await this.tableauxRepository.remove(found);
     const reponse = {
      test: `Le tableau avec l'identifiant : ${id} a été supprimée`
     }
     return reponse;
  }
}
