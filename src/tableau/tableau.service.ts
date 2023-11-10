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
    try {
      const tableau = this.tableauxRepository.create(createTableauDto);
      const result = await this.tableauxRepository.save(tableau);
      return result;
    } catch (error) {
      throw new Error(
        `Erreur lors de la création du tableau : ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.tableauxRepository.find();
      //`This action returns all tableau`;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération de tous les tableaux : ${error.message}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      const found = await this.tableauxRepository.findOneBy({ id });
      if (!found) {
        throw new NotFoundException(`Tableaux avec l'id ${id} introuvable`);
      }
      return found;
      // return `This action returns a #${id} tableau`;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération du tableau : ${error.message}`,
      );
    }
  }

  async update(id: number, updateTableauDto: UpdateTableauDto) {
    try {
      const tableau = await this.findOne(id);
      const newTableau = this.tableauxRepository.merge(
        tableau,
        updateTableauDto,
      );
      const result = await this.tableauxRepository.save(newTableau);
      return result;
      // return `This action updates a #${id} tableau`;
    } catch (error) {
      throw new Error(
        `Erreur lors de la mise à jour du tableau : ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const found = await this.findOne(id);
      console.log('coucou1');
      await this.tableauxRepository.remove(found);
      console.log('coucou2');
      const reponse = {
        test: `Le tableau avec l'identifiant : ${id} a été supprimée`,
      };
      return reponse;
    } catch (error) {
      throw new Error(
        `Erreur lors de la suppression du tableau : ${error.message}`,
      );
    }
  }
}
