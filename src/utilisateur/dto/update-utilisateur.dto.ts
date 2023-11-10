import { PartialType } from '@nestjs/swagger';
import { CreateUtilisateurDto } from './create-utilisateur.dto';
import { Tableau } from 'src/tableau/entities/tableau.entity';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {
  tableauFavoris: Tableau[];
}
