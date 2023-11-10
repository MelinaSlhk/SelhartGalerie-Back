import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAviDto } from './dto/create-avi.dto';
import { UpdateAviDto } from './dto/update-avi.dto';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { Tableau } from 'src/tableau/entities/tableau.entity';
import { Avis } from './entities/avi.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AvisService {
  constructor(
    @InjectRepository(Avis)
    private avisRepository: Repository<Avis>,
    @InjectRepository(Tableau)
    private tableauRespository: Repository<Tableau>, 
  ) {}
  async create(
    createAviDto: CreateAviDto,
    id_utilisateur: Utilisateur,
    id_tableau: number,
  ): Promise<Avis> {
    try {
      // Recherche le tableau associé à l'ID donné
      const tableau = await this.tableauRespository.findOne({
        where: { id: id_tableau },
      });

      // Crée un nouvel avis.
      const newAvis = new Avis();
      newAvis.avis = createAviDto.avis;
      newAvis.utilisateur = id_utilisateur;
      newAvis.tableau = tableau;

      // Sauvegarde la nouvelle review.
      const createdAvis = await this.avisRepository.save(newAvis);

      return createdAvis;
    } catch (error) {
      throw new Error(
        `Erreur lors de la création de l'avis : ${error.message}`,
      );
    }
  }

  async findAllByTableauId(id: number) {
    try {
      const avis = await this.avisRepository.find({
        where: { tableau: { id: id } },
        relations: ['utilisateur'],
      });

      if (avis.length === 0) {
        return {
          status: 'success',
          message: `Aucun avis n'a été trouvée pour le tableau avec l'id ${id}.`,
          data: [],
        };
      }
      // Boucle for pour effacer les données de nos utilisateurs
      avis.forEach((avis) => {
        if (avis.utilisateur) {
          delete avis.utilisateur.email;
          delete avis.utilisateur.nom;
          delete avis.utilisateur.prenom;
          delete avis.utilisateur.motdepasse;
        }
      });

      return {
        status: 'success',
        message: `Les avis pour le tableauavec l'id ${id} ont été trouvées.`,
        data: avis,
      };
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des avis : ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.avisRepository.find();
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération de tous les avis : ${error.message}`,
      );
    }
  }

  
  update(id: number, updateAviDto: UpdateAviDto) {
    try {
      return `This action updates a #${id} avi`;
    } catch (error) {
      throw new Error(
        `Erreur lors de la mise à jour de l'avis : ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const result = await this.avisRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException("Cette review n'existe pas !");
      }
      return {
        status: 'success',
        message: `La review avec l'id ${id} a été supprimée avec succès.`,
      };
    } catch (error) {
      throw new Error(
        `Erreur lors de la suppression de l'avis : ${error.message}`,
      );
    }
  }
  
}
  