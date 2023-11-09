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
  }

  async findAllByTableauId(id: number) {
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
  }

  async findAll() {
    return await this.avisRepository.find();
  }

  
  update(id: number, updateAviDto: UpdateAviDto) {
    return `This action updates a #${id} avi`;
  }

  async remove(id: number) {
    const result = await this.avisRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Cette review n'existe pas !");
    }
    return {
      status: 'success',
      message: `La review avec l'id ${id} a été supprimée avec succès.`,
    };
  }
  
}
  