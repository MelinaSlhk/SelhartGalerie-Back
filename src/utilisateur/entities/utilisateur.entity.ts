import { Tableau } from 'src/tableau/entities/tableau.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('utilisateur')
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nom: string;

  @Column({ length: 255 })
  prenom: string;

  @Column({ length: 255, unique: true }) // Utilisation de l'option unique
  email: string;

  @Column({ length: 60 })
  mot_de_passe: string;

  @Column({ type: 'boolean' })
  administrateur: boolean;


}
