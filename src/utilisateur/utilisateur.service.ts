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
     try {
       const newUtilisateur =
         this.utilisateursRepository.create(createUtilisateurDto);
       const createdUtilisateur =
         await this.utilisateursRepository.save(newUtilisateur);
       return createdUtilisateur;
     } catch (error) {
       throw new Error(
         `Erreur lors de la création de l'utilisateur : ${error.message}`,
       );
     }
  }

  findAll() {
    try {
      return this.utilisateursRepository.find();
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération de tous les utilisateurs : ${error.message}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      const utilisateur = await this.utilisateursRepository.findOneBy({ id });
      if (!utilisateur) {
        throw new NotFoundException(`Utilisateur avec l'id ${id} introuvable`);
      }
      return utilisateur;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération de l'utilisateur : ${error.message}`,
      );
    }
  }

  async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    try {
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
    } catch (error) {
      throw new Error(
        `Erreur lors de la mise à jour de l'utilisateur : ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const utilisateurAsupprimer = await this.findOne(id);
      const result = await this.utilisateursRepository.remove(
        utilisateurAsupprimer,
      );
      if (!result) {
        throw new NotFoundException(
          `Le membre ${utilisateurAsupprimer.prenom} n'a pas été trouver`,
        );
      }
    } catch (error) {
      throw new Error(
        `Erreur lors de la suppression de l'utilisateur : ${error.message}`,
      );
    }
  }
}
 