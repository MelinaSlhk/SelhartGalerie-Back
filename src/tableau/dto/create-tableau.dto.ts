import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTableauDto {
  // liste propriété de la table et type

  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  dimension: string;

  @IsNotEmpty()
  @IsNumber()
  id_image: number;
}
