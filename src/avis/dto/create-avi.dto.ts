import { IsNotEmpty, IsString } from 'class-validator';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

export class CreateAviDto {
  // @IsNotEmpty()
  @IsString()
  avis: string;

  utilisateur: Utilisateur;
}
