import { IsNotEmpty, IsString } from "class-validator";

export class CreateTableauDto {
  // liste propriété de la table et type

  @IsNotEmpty()
  @IsString()
  nom: string;
  
  @IsNotEmpty()
  @IsString()
  dimension: string;

  id_image: number;
}
