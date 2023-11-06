import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Tableau } from 'src/tableau/entities/tableau.entity';

@Entity('avis')
@Unique(['utilisateur', 'tableau'])
export class Avis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  avis: string;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.avis, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @ManyToOne(() => Tableau, (tableau) => tableau.avis, {
    eager: false,
  })
  @JoinColumn({ name: 'id_tableau' })
  tableau: Tableau;
}
