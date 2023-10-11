import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity'; 
import { Tableau } from 'src/tableau/entities/tableau.entity';

@Entity()
@Unique(['utilisateur', 'tableau'])
export class Avis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  avis: string;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.avis)
  utilisateur: Utilisateur;

  @ManyToOne(() => Tableau, (tableau) => tableau.avis)
  tableau: Tableau;
}
