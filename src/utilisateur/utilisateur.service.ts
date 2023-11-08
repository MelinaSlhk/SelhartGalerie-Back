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
    @InjectRepository(Tableau) // Injection du repository de la classe Tableau
    private readonly tableauRepository: Repository<Tableau>,
  ) {}

  async create(createUtilisateurDto: CreateUtilisateurDto) {
    const newUtilisateur =
      this.utilisateursRepository.create(createUtilisateurDto);
    const createdUtilisateur =
      await this.utilisateursRepository.save(newUtilisateur);
    return createdUtilisateur;
    // await return 'This action adds a new utilisateur';
  }

  findAll() {
    return this.utilisateursRepository.find(); //`This action returns all utilisateur`;
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

    const updatedUtilisateur = this.utilisateursRepository.merge(utilisateur, updateUtilisateurDto);

    const result = await this.utilisateursRepository.save(updatedUtilisateur);
    return result;
  }
  
  remove(id: number) {
    return `This action removes a #${id} utilisateur`;
  }
}
  // async addFavori(utilisateurId: number, tableauId: number) {
  //   const utilisateur = await this.utilisateursRepository.findOne({
  //     where: { id: utilisateurId },
  //     relations: ['tableauxFavoris'],
  //   });

  //   if (!utilisateur) {
  //     throw new Error('Utilisateur non trouvé');
  //   }
  //   const tableauIndex = utilisateur.tableauxFavoris.findIndex(
  //     (tableau) => tableau.id === tableauId,
  //   );

  //   if (tableauIndex !== -1) {
      // Le tableau est déjà dans les favoris, supprimez-le
    //   utilisateur.tableauxFavoris.splice(tableauIndex, 1);
    // } else {
      // Le tableau n'est pas dans les favoris, ajoutez-le
  //     const tableau = await this.tableauRepository.findOne({
  //       where: { id: tableauId },
  //     });
  //     if (!tableau) {
  //       throw new Error('Tableau non trouvé');
  //     }
  //     utilisateur.tableauxFavoris.push(tableau);
  //   }

  //   return this.utilisateursRepository.save(utilisateur);
  // }

    