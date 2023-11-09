import { Injectable, NotFoundException } from '@nestjs/common';
import { Utilisateur } from './entities/utilisateur.entity';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tableau } from 'src/tableau/entities/tableau.entity';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateursRepository: Repository<Utilisateur>,
    @InjectRepository(Tableau) 
    private readonly tableauRepository: Repository<Tableau>,
  ) {}

  async create(createUtilisateurDto: CreateUtilisateurDto) {
    const newUtilisateur =
      this.utilisateursRepository.create(createUtilisateurDto);
    const createdUtilisateur =
      await this.utilisateursRepository.save(newUtilisateur);
    return createdUtilisateur;
  }

  findAll() {
    return this.utilisateursRepository.find(); 
  }

  async findOne(id: number) {
    const utilisateur = await this.utilisateursRepository.findOneBy({ id });
    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} introuvable`);
    }
    return utilisateur;
  }

  async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    const utilisateur = await this.findOne(id);

    //mise à jour des tableaux favoris
    if (utilisateur.tableauxFavoris) {
      utilisateur.tableauxFavoris = updateUtilisateurDto.tableauFavoris;
    }

    const updatedUtilisateur = this.utilisateursRepository.merge(
      utilisateur,
      updateUtilisateurDto,
    );

    const result = await this.utilisateursRepository.save(updatedUtilisateur);
    return result;
  }

  async remove(id: number) {
    const utilisateurAsupprimer = await this.findOne(id);
    const result = await this.utilisateursRepository.remove(
      utilisateurAsupprimer,
    );
    if (!result) {
      throw new NotFoundException(
        `Le membre ${utilisateurAsupprimer.prenom} n'a pas été trouver`,
      );
    }
  }
}
 