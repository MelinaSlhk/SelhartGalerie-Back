import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  nom: string;
  
  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  motdepasse: string;

  @IsBoolean()
  administrateur: boolean;
}
