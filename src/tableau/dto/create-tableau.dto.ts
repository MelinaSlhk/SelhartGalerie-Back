import { IsNotEmpty, IsString } from "class-validator";
import { Image } from "src/image/entities/image.entity";

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
